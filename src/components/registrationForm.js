import locators from '../../locators/registration.js'
import { expect } from '@playwright/test'; 

export default class RegistrationForm {
    constructor(page) {
        this._page = page
        this.registrationModalTitle = page.locator(locators.registrationModalTitle)
        this.nameLabel = page.locator(locators.nameLabel)
        this.lastNameLabel = page.locator(locators.lastNameLabel)
        this.emailLabel = page.locator(locators.emailLabel)
        this.passwordLabel = page.locator(locators.passwordLabel)
        this.reenterPasswordLabel = page.locator(locators.reenterPasswordLabel)
        this.registrationButton = page.locator(locators.registrationButton)
        this.allertForField = page.locator(locators.allertForField)
        this.nameField = page.locator(locators.name)
        this.lastNameField = page.locator(locators.lastName)
        this.emailField = page.locator(locators.email)
        this.passwordField = page.locator(locators.password)
        this.repeatePasswordField = page.locator(locators.repeatPassword)
    }    

    async checkTextElements (pageElement, expectedText) {
        await expect.soft(pageElement).toHaveText(expectedText)
    }

    async isAllertForValidDataAbsent (locator, data) {
        const field = this._page.locator(locator);
        const allert = this.allertForField
        await field.fill(data)
        await this._page.click('body')
        await expect.soft(allert).not.toBeVisible();
        await expect.soft(field).toHaveCSS('border-color','rgb(206, 212, 218)')
    }

    async isAllertForInvalidData (locator, data, expectedText) {
        const field = this._page.locator(locator);
        const allert = this.allertForField
        await field.fill(data)
        await this._page.click('body')
        await expect.soft(allert).toHaveText(expectedText);
        await expect.soft(field).toHaveCSS('border-color','rgb(220, 53, 69)')
    }

    async fillRegistrationForm (data1, data2, data3, data4, data5) {
        await this.nameField.fill(data1)
        await this.lastNameField.fill(data2)
        await this.emailField.fill(data3)
        await this.passwordField.fill(data4)
        await this.repeatePasswordField.fill(data5)
    }

    async isButtonDisabled () {
        await expect(this.registrationButton).toBeDisabled();
    }
}