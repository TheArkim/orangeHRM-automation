import { test } from '@playwright/test'
import { BasePage } from '../../pages/base.page'
import { LoginPage } from '../../pages/login/login.page'
import { env } from '../../config/env'

test.beforeEach(async ({page}) => {
  const base = new BasePage(page)

  await base.open('/web/index.php/auth/login')
})

test('login successful', async ({page}) => {
  const login = new LoginPage(page)

  await login.login(env.username, env.password)
  await login.expectSuccessfulLogin()
})

test('login with incorrect password', async ({page}) => {
  const login = new LoginPage(page)

  await login.login(env.username, 'noPassword')
  await login.expectInvalidCredentials()
})
