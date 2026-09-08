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

test('create employee', async ({page}) => {
  const pim = new PIMPage(page)

  await pim.fillEmployeeData('HRM', 'Test', 'User', '1441')
  await pim.createLoginDetails('HRMTest', 'HRMpassword1')
  await pim.checkDataCreated('HRM User')

  await pim.deleteUser('1441')
})