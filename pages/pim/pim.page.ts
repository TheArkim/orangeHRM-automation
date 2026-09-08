import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from '../base.page'

export class PIMPage extends BasePage {
  private readonly pimOption: Locator
  private readonly AddEmploye: Locator
  private readonly AddReport: Locator

  private readonly employeeName: Locator
  private readonly employeeMiddleName: Locator
  private readonly employeeLastName: Locator
  private readonly employeeId: Locator
  private readonly createLoginDetailsCheck: Locator
  private readonly employeeUsername: Locator
  private readonly employeePassword: Locator
  private readonly employeeConfirmPassword: Locator
  private readonly employeeStatus: Locator
  private readonly saveButton: Locator
  private readonly searchButton: Locator
  private readonly deleteButton: Locator
  private readonly deleteConfirmButton: Locator
  private readonly listEmployeeOption: Locator


  private readonly addButton: Locator
  private readonly reportName: Locator
  private readonly selectOption: Locator
  private readonly newFieldButton:Locator
  private readonly includeHeaderOption: Locator
  private readonly reportNameList: Locator
  private readonly autocomplete: Locator


  constructor(page: Page) {
    super(page)
    this.pimOption = page.getByRole('link', { name: 'PIM', exact: true })
    this.AddEmploye = page.getByRole('link', { name: 'Add Employee' })
    this.listEmployeeOption = page.getByRole('link', { name: 'Employee List' })
    this.AddReport = page.getByRole('link', { name: 'Reports' })

    this.employeeName = page.locator('[name="firstName"]')
    this.employeeMiddleName = page.locator('[name="middleName"]')
    this.employeeLastName = page.locator('[name="lastName"]')
    this.employeeId = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
    this.createLoginDetailsCheck = page.locator('.user-form-header').filter({ hasText: 'Create Login Details' }).locator('.oxd-switch-input')
    this.employeeUsername = page.locator('.oxd-input-group').filter({hasText: 'Username'}).locator('input')
    this.employeePassword = page.locator('.oxd-input-group').filter({hasText: /^Password/}).locator('input')
    this.employeeConfirmPassword = page.locator('.oxd-input-group').filter({hasText: /^Confirm Password/}).locator('input')
    this.employeeStatus = page.getByText('Disabled', { exact: true })
    this.saveButton = page.getByRole('button', { name: 'Save' })
    this.searchButton = page.getByRole('button', { name: 'Search' })
    this.deleteButton = page.locator('button').filter({ has: page.locator('.bi-trash') })
    this.deleteConfirmButton = page.getByRole('button', { name: ' Yes, Delete ' })

    this.addButton = page.getByRole('button', { name: 'Add' })
    this.reportName = page.getByPlaceholder('Type here ...')
    this.selectOption = page.locator('.oxd-select-text-input')
    // this.selectOption = page.locator('.oxd-select-text-input').nth(0)
    // this.selectOption = page.locator('.oxd-select-text-input').nth(1)
    // this.selectOption = page.locator('.oxd-select-text-input').nth(2)
    // this.selectOption = page.locator('.oxd-select-text-input').nth(3)
    this.newFieldButton = page.locator('button').filter({ has: page.locator('.bi-plus') })
    this.includeHeaderOption = page.locator('.orangehrm-report-field').filter({ hasText: 'Include Header' }).locator('.oxd-switch-input')
    this.reportNameList = page.getByPlaceholder('Type for hints...')
    this.autocomplete = page.locator('.oxd-autocomplete-dropdown')

  }

    async fillEmployeeData(name: string, middleName: string, lastName: string, employeeId: string) {
      await this.pimOption.click()
      await this.AddEmploye.click()
      await this.employeeName.fill(name)
      await this.employeeMiddleName.fill(middleName)
      await this.employeeLastName.fill(lastName)
      await this.employeeId.fill(employeeId)
    }

    async createLoginDetails(username: string, password: string){
      await this.createLoginDetailsCheck.check()
      await this.employeeUsername.fill(username)
      await this.employeePassword.fill(password)
      await this.employeeConfirmPassword.fill(password)
      await this.employeeStatus.check()
      await this.saveButton.click()
    }

    async checkDataCreated(title: string) {
      const userHeader = this.page.locator('.orangehrm-card-container');
      await expect(userHeader).toBeVisible()
      await expect(userHeader).toContainText(title)
    }

    async deleteUser(userId: string){
      await this.pimOption.click()
      await this.listEmployeeOption.click()
      await this.employeeId.fill(userId)
      await this.searchButton.click()
      await this.deleteButton.click()
      await this.deleteConfirmButton.click()
    }

    async createReport(name: string, data: any){
      await this.pimOption.click()
      await this.AddReport.click()
      await this.addButton.click()
      await this.reportName.fill(name)

      await this.selectOption.nth(0).click()
      await this.page.getByRole('option', { name: data.employmentStatus, exact: true }).click()
      await this.newFieldButton.nth(0).click()

      await this.selectOption.nth(2).click()
      await this.page.getByRole('option', { name: data.contract, exact: true }).click()

      await this.selectOption.nth(0).click()
      await this.page.getByRole('option', { name: data.education.title, exact: true }).click()
      await this.newFieldButton.nth(0).click()

      await this.selectOption.nth(3).click()
      await this.page.getByRole('option', { name: data.education.grade, exact: true }).click()

      await this.selectOption.nth(1).click()
      await this.page.getByRole('option', { name: data.employees, exact: true }).click()

      await this.selectOption.nth(4).click()
      await this.page.getByRole('option', { name: data.information.type, exact: true }).click()

      await this.selectOption.nth(5).click()
      await this.page.getByRole('option', { name: data.information.id, exact: true }).click()
      await this.newFieldButton.nth(1).click()

      await this.selectOption.nth(5).click()
      await this.page.getByRole('option', { name: data.information.name, exact: true }).click()
      await this.newFieldButton.nth(1).click()

      await this.selectOption.nth(5).click()
      await this.page.getByRole('option', { name: data.information.lastName, exact: true }).click()
      await this.newFieldButton.nth(1).click()

      await this.includeHeaderOption.check()
      await this.saveButton.click()
    }

    async deleteReport(reportName: string){
      await this.pimOption.click()
      await this.AddReport.click()
      await this.reportNameList.fill(reportName)
      await this.autocomplete.filter({ hasText: reportName}).click()
      await this.searchButton.click()
      await this.deleteButton.nth(0).click()
      await this.deleteConfirmButton.click()
    }
}
