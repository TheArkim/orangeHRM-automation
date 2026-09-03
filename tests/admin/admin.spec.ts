import { test } from '@playwright/test'
import { BasePage } from '../../pages/base.page'
import { LoginPage } from '../../pages/login/login.page'
import { AdminPage } from '../../pages/admin/admin.page';
import authData from '../../test-data/.auth.json'


test.beforeEach(async ({page}) => {
  const base = new BasePage(page)
  const login = new LoginPage(page)

  await base.loadWeb(authData.loginPage)
  await login.fillLoginInfo(authData.username, authData.password)
})

test('create user', async ({page}) => {
  const admin = new AdminPage(page)

  await admin.createUser()
})
