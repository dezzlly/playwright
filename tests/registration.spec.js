import { test, expect } from '@playwright/test'; 
import locators from '../locators/registration';
import Home from '../src/pages/home';
import RegistrationForm from '../src/components/registrationForm';

const signUp = locators.signUp
const registrationModalTitle = locators.registrationModalTitle
const nameLabel = locators.nameLabel
const lastNameLabel = locators.lastNameLabel
const emailLabel = locators.emailLabel
const passwordLabel = locators.passwordLabel
const reenterPasswordLabel = locators.reenterPasswordLabel
const registrationButton = locators.registrationButton
const name = locators.name
const lastName = locators.lastName
const email = locators.email
const password = locators.password
const repeatPassword = locators.repeatPassword
const allertForField = locators.allertForField

test.beforeEach(async ({ page }) => {  
    const openRegistrationForm = new Home(page)
    await openRegistrationForm.open()    
    await openRegistrationForm.openRegistrationForm(page)    
});


test.describe('Check text elements', () => {

    const locators = {        
        registrationModalTitle, 
        nameLabel, 
        lastNameLabel, 
        emailLabel, 
        passwordLabel, 
        reenterPasswordLabel, 
        registrationButton
    }

    const texts = {
        registrationModalTitle: 'Registration', 
        nameLabel: 'Name', 
        lastNameLabel: 'Last name', 
        emailLabel: 'Email', 
        passwordLabel: 'Password', 
        reenterPasswordLabel: 'Re-enter password',
        registrationButton: 'Register'
    }   
  
    for (const [key, selector] of Object.entries(locators)) {
        test(`Check that element ${key} has text ${texts[key]}` , async ({ page }) => {
            const pageElement = page.locator(selector);
            const textElements = new RegistrationForm(page)
            await textElements.checkTextElements(pageElement, texts[key])
    })
    }
})

test.describe('Check that Name and Last Name fields work correctly with correct data', () => {

    const names = ['Al', 'AleksanderAleksander']

    for (const data of names) {        
        test(`Check Name field when user enters ${data} 2 or 20 symbols`, async ({ page }) => {
            const isAllert = new RegistrationForm(page)
            await isAllert.isAllertForValidDataAbsent(locators.name, data)            
        })
    }

    for (const data of names) {
        test(`Check Last Name field when user enters ${data} 2 or 20 symbols`, async ({ page }) => {  
            const isAllert = new RegistrationForm(page)
            await isAllert.isAllertForValidDataAbsent(locators.lastName, data) 
        })     
    }

})

test.describe('Check that Email field works correctly with correct data', () => {

    const emails = ['tester@gmail.com', 'tester123@gmail.com', 'tes.ter@gmail.com', '3457890@gmail.com']

    for (const data of emails) {
        test(`Check Email field when user enters ${data} `, async ({ page }) => {
            const isAllert = new RegistrationForm(page)
            await isAllert.isAllertForValidDataAbsent(locators.email, data)        
        })
    } 

})

test.describe('Check that Password field works correctly with correct data', () => {

    const passwords = ['Qa12345!', 'Qa1234567890qA!']

    for (const data of passwords) {
        test(`Check Password and Repeat Password fields when user enters ${data} `, async ({ page }) => {
            const isAllert = new RegistrationForm(page)
            await isAllert.isAllertForValidDataAbsent(locators.password, data)    
            await isAllert.isAllertForValidDataAbsent(locators.repeatPassword, data)       
        })
    } 

})

test.describe('Check errors when fields is empty', () => {

    const locators = {
        name, 
        lastName, 
        email, 
        password, 
        repeatPassword 
    }

    const allerts = {
        name: 'Name required', 
        lastName: 'Last name required', 
        email: 'Email required', 
        password: 'Password required', 
        repeatPassword: 'Re-enter password required'  
    }

    for (const [key, selector] of Object.entries(locators)) {
        test(`Check field ${key} error when it empty`, async ({ page }) => {           
            const isAllert = new RegistrationForm(page)
            await isAllert.isAllertForInvalidData(selector, '' , allerts[key])
        })
    }

})

test.describe('Check errors for Name and Last Name fields when user enters incorrect data', () => {

    const locators = {
        name, 
        lastName        
    }

    const allertsOne = {
        name: 'Name is invalid', 
        lastName: 'Last name is invalid'    
    }    

    const allertsTwo = {
        name: 'Name has to be from 2 to 20 characters long', 
        lastName: 'Last name has to be from 2 to 20 characters long'        
    }

    const dataOne = ['234', 'сми', '!£']
    const dataTwo = ['A', 'AleksanderAleksanderA']

    for (const [key, selector] of Object.entries(locators)) {
        for (const testData of dataOne) {
            test(`Check ${key} field error when user enters ${testData}`, async ({ page }) => {
                const isAllert = new RegistrationForm(page)
                await isAllert.isAllertForInvalidData(selector, testData, allertsOne[key]) 
            })
        }        
    }

    for (const [key, selector] of Object.entries(locators)) {
        for (const testData of dataTwo) {
            test(`Check ${key} field error when user enters ${testData}`, async ({ page }) => {
                const isAllert = new RegistrationForm(page)
                await isAllert.isAllertForInvalidData(selector, testData, allertsTwo[key]) 
            })
        }        
    }

})

test.describe('Check errors for Email field when user enters incorrect data', () => {

    const emails = [
        'üüüüüöö@gmail.com', 
        'ыыыыыыы@gmail.com', 
        '!!!!!!!@gmail.com', 
        'qqqqqqgmail.com', 
        'qqqqqqqqq@', 
        'qqqqqqqqq@gmail'
    ]

    for (const data of emails) {
        test(`Check Email field error when user enters ${data}`, async ({ page }) => {
            const isAllert = new RegistrationForm(page)
            await isAllert.isAllertForInvalidData(locators.email, data, 'Email is incorrect')   
        })
    } 

})

test.describe('Check errors for Password and Re-enter password fields when user enters incorrect data', () => {

    const passwords = [
        'qa123456', 
        'QA123456', 
        'Qawsedr', 
        'Qa12345', 
        'Qa1234567890qaws'
    ]

    for (const data of passwords) {
        test(`Check Password field error when user enters ${data}`, async ({ page }) => {
            const isAllert = new RegistrationForm(page)
            await isAllert.isAllertForInvalidData(locators.password, data, 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter') 
        })
    } 

    for (const data of passwords) {
        test(`Check Repeate password field error when user enters ${data}`, async ({ page }) => {
            const isAllert = new RegistrationForm(page)
            await isAllert.isAllertForInvalidData(locators.repeatPassword, data, 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        })
    } 

})

test.describe(`Check errors Re-enter password field when Re-enter password does't match with Password`, () => {

    test(`Check errors Re-enter password field when Re-enter password does't match with Password`, async ({ page }) => {
        const passwordElement = page.locator(password) 
        await passwordElement.fill('Qa12345!')
        const isAllert = new RegistrationForm(page)
        await isAllert.isAllertForInvalidData(locators.repeatPassword, 'Qa12345!!', 'Passwords do not match')                   
    })    

})

test.describe(`Check that the button Register is disabled when user entered some incorrect data`, () => {    

    const testData = [
        {
            name: 'A',      
            lastName: 'Os',    
            email: 'test123@gmail.com',   
            password: 'Qa12345!',  
            repeatPassword: 'Qa12345!' 
        },
        {
            name: 'Al',       
            lastName: 'O',  
            email: 'test123@gmail.com',  
            password: 'Qa12345!',       
            repeatPassword: 'Qa12345!' 
        },
        {
            name: 'Al',     
            lastName: 'Os',     
            email: 'test123gmail.com',   
            password: 'Qa12345!',      
            repeatPassword: 'Qa12345!'  
        },
        {
            name: 'Al',      
            lastName: 'Os',      
            email: 'test123@gmail.com',  
            password: 'Qa12345',          
            repeatPassword: 'Qa12345'   
        },
        {
            name: 'Al',       
            lastName: 'Os',      
            email: 'test123@gmail.com', 
            password: 'Qa12345!',      
            repeatPassword: 'Qa12345'  
        }
    ];

    for (const [index, data] of testData.entries()) {
        test(`Check case ${index + 1} where name: "${data.name}", lastName: "${data.lastName}", email: "${data.email}", password: "${data.password}", repeatPassword: "${data.repeatPassword}"`, async ({ page }) => {
            const fillForm = new RegistrationForm(page)           
            await fillForm.fillRegistrationForm(data.name, data.lastName, data.email, data.password, data.repeatPassword)
            await fillForm.isButtonDisabled()
        });
    }

})