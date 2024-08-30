import locators from '../../locators/registration.js'

export default class Home {
    constructor(page) {
        this._page = page
        this._url = '/'
        this.signUp = page.locator(locators.signUp)
    }

    async open() {
        await this._page.goto(this._url);
      }

    async openRegistrationForm() {
        await this.signUp.click()
    }
}