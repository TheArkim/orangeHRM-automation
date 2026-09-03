import { test } from '@playwright/test'
import { BasePage } from '../../pages/base.page'
import { LoginPage } from '../../pages/login/login.page'
import { loginLocators } from '../../locators/login.locators';
import { env } from '../../config/env'

test.beforeEach(async ({page}) => {
  const base = new BasePage(page)

  await base.loadWeb('/web/index.php/auth/login')
})

test('login successful', async ({page}) => {
  const login = new LoginPage(page)

  await login.fillLoginInfo(env.username, env.password)
  await login.confirmationLogin()
})

test('Login password incorrect', async ({page}) => {
  const login = new LoginPage(page)

  await login.fillLoginInfo(env.username, 'noPassword')
  await login.expectVisible(loginLocators.errorMessage)
})
