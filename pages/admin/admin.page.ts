import { BasePage } from "../base.page";
import { adminLocators } from "../../locators/admin.locators";
import { Page, Locator } from "@playwright/test";

export class AdminPage extends BasePage {
  private readonly adminOption
  private readonly addButton
  private readonly userRole

  constructor(page: Page) {
    super(page)
    this.adminOption = page.locator(adminLocators.adminOption)
    this.addButton = page.locator(adminLocators.addButton)
    this.userRole = page.locator(adminLocators.userRole)
  }

  async createUser(){
    await this.clickOn(adminLocators.adminOption)
    await this.clickOn(adminLocators.addButton)
    await this.selectOptList(adminLocators.userRole, 0, 'Admin')
    await this.selectOptList(adminLocators.userRole, 1, 'Enabled')
  }
}