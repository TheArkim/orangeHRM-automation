import { test } from '@playwright/test'
import { BasePage } from '../../pages/base.page'
import { LoginPage } from '../../pages/login/login.page'
import { PIMPage } from '../../pages/pim/pim.page'
import { env } from '../../config/env'


test.beforeEach(async ({page}) => {
  const base = new BasePage(page)
  const login = new LoginPage(page)

  await base.open('/web/index.php/auth/login')
  await login.login(env.username, env.password)
})

test('create report', async ({page}) => {
  const pim = new PIMPage(page)

  const data = {employmentStatus: "Employment Status", contract: "Full-Time Contract", education: {title: "Education", grade: "Bachelor's Degree"}, employees: "Current Employees Only", information: {type: "Personal", id: "Employee Id", name: "Employee First Name", lastName: "Employee Last Name"}}

  await pim.createReport('Test Report', data)
  await pim.checkDataCreated('Test Report')

  await pim.deleteReport('Test Report')
})
