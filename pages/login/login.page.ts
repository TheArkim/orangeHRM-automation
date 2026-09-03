import { BasePage } from "../base.page";
import { loginLocators } from "../../locators/login.locators";
import { Page, Locator } from "@playwright/test";


export class LoginPage extends BasePage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly dashboardTitle: Locator;
  private readonly userTag: Locator;

  constructor(page: Page){
    super(page)
    this.username = page.locator(loginLocators.username)
    this.password = page.locator(loginLocators.password)
    this.loginButton = page.locator(loginLocators.loginButton)
    this.dashboardTitle = page.locator(loginLocators.dashboardTitle)
    this.userTag = page.locator(loginLocators.userTag)
  }

  async fillLoginInfo(username: string, password: string){
    await this.fillField(loginLocators.username, username)
    await this.fillField(loginLocators.password, password)
    await this.clickOn(loginLocators.loginButton)
  }

  async confirmationLogin(){
    await this.expectVisible(loginLocators.dashboardTitle)
    await this.expectVisible(loginLocators.userTag)
  }
}
