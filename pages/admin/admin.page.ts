import { Locator, Page } from '@playwright/test'
import { BasePage } from '../base.page'

export class AdminPage extends BasePage {
  private readonly adminOption: Locator
  private readonly addButton: Locator
  private readonly userRole: Locator
  private readonly status: Locator
  private readonly employeeName: Locator

  constructor(page: Page) {
    super(page)
    this.adminOption = page.getByRole('link', { name: 'Admin', exact: true })
    this.addButton = page.getByRole('button', { name: 'Add' })
    this.userRole = page.locator('.oxd-select-text').nth(0)
    this.status = page.locator('.oxd-select-text').nth(1)
    this.employeeName = page.getByPlaceholder('Type for hints...')
  }

  async openCreateUserForm() {
    await this.adminOption.click()
    await this.addButton.click()
  }

  async selectUserRole(role: string) {
    await this.userRole.click()
    await this.page.getByRole('option', { name: role, exact: true }).click()
  }

  async selectUserStatus(status: string) {
    await this.status.click()
    await this.page.getByRole('option', { name: status, exact: true }).click()
  }

  async fillEmployeeName(name: string) {
    await this.employeeName.fill(name)
  }
}