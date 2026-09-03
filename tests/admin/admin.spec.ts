import { test } from '@playwright/test'
import { BasePage } from '../../pages/base.page'
import { LoginPage } from '../../pages/login/login.page'
import { AdminPage } from '../../pages/admin/admin.page';
import { env } from '../../config/env'


test.beforeEach(async ({page}) => {
  const base = new BasePage(page)
  const login = new LoginPage(page)

  await base.loadWeb('/web/index.php/auth/login')
  await login.fillLoginInfo(env.username, env.password)
})

test('create user', async ({page}) => {
  const admin = new AdminPage(page)

  await admin.createUser()
})
