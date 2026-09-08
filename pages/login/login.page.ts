import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from '../base.page'

export class LoginPage extends BasePage {
  private readonly username: Locator
  private readonly password: Locator
  private readonly loginButton: Locator
  private readonly dashboardTitle: Locator
  private readonly errorMessage: Locator

  constructor(page: Page) {
    super(page)
    this.username = page.getByPlaceholder('Username')
    this.password = page.getByPlaceholder('Password')
    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.dashboardTitle = page.locator('.oxd-brand-banner')
    this.errorMessage = page.locator('.oxd-alert--error')
  }

  async login(username: string, password: string) {
    await this.username.fill(username)
    await this.password.fill(password)
    await this.loginButton.click()
  }

  async expectSuccessfulLogin() {
    await expect(this.dashboardTitle).toBeVisible()
  }

  async expectInvalidCredentials() {
    await expect(this.errorMessage).toBeVisible()
  }
}
