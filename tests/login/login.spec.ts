import { test } from '@playwright/test'
import { BasePage } from '../../pages/base.page'
import { LoginPage } from '../../pages/login/login.page'
import { loginLocators } from '../../locators/login.locators';
import authData from '../../test-data/.auth.json'

test.beforeEach(async ({page}) => {
  const base = new BasePage(page)

  await base.loadWeb(authData.loginPage)
})

test('login successful', async ({page}) => {
  const login = new LoginPage(page)

  await login.fillLoginInfo(authData.username, authData.password)
  await login.confirmationLogin()
})

test('Login password incorrect', async ({page}) => {
  const login = new LoginPage(page)

  await login.fillLoginInfo(authData.username, authData.wrongPassword)
  await login.expectVisible(loginLocators.errorMessage)
})
