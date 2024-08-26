import { test, expect } from '@playwright/test'; 
import locators from '../locators/registration';

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
    await page.goto('/');
    await page.click(signUp)
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
        test(`Check that element ${key} has text ${texts[key]}`, async ({ page }) => {
            const pageElement = page.locator(selector);         
            await expect(pageElement).toHaveText(texts[key])                     
        })
    }   

})

test.describe('Check that Name and Last Name fields work correctly with correct data', () => {

    const names = ['Al', 'AleksanderAleksander']

    for (const data of names) {        
        test(`Check Name field when user enters ${data} 2 or 20 symbols`, async ({ page }) => {
            const nameElement = page.locator(name)
            const allertForFieldElement = page.locator(allertForField)
    
            await nameElement.fill(data)
            await page.click('body')
            await expect(allertForFieldElement).not.toBeVisible();
            await expect(nameElement).toHaveCSS('border-color', 'rgb(206, 212, 218)')
        })
    }

    for (const data of names) {
        test(`Check Last Name field when user enters ${data} 2 or 20 symbols`, async ({ page }) => {        
            const lastNameElement = page.locator(lastName)
            const allertForFieldElement = page.locator(allertForField)
    
            await lastNameElement.fill(data)
            await page.click('body')
            await expect(allertForFieldElement).not.toBeVisible();    
            await expect(lastNameElement).toHaveCSS('border-color','rgb(206, 212, 218)')        
        })     
    }

})

test.describe('Check that Email field works correctly with correct data', () => {

    const emails = ['tester@gmail.com', 'tester123@gmail.com', 'tes.ter@gmail.com', '3457890@gmail.com']

    for (const data of emails) {
        test(`Check Email field when user enters ${data} `, async ({ page }) => {
            const emailElement = page.locator(email)
            const allertForFieldElement = page.locator(allertForField)
        
            await emailElement.fill(data)
            await page.click('body')
            await expect(allertForFieldElement).not.toBeVisible(); 
            await expect(emailElement).toHaveCSS('border-color','rgb(206, 212, 218)')           
        })
    } 

})

test.describe('Check that Password field works correctly with correct data', () => {

    const passwords = ['Qa12345!', 'Qa1234567890qA!']

    for (const data of passwords) {
        test(`Check Password and Repeat Password fields when user enters ${data} `, async ({ page }) => {
            const passwordElement = page.locator(password)
            const repeatPasswordElement = page.locator(repeatPassword)
            const allertForFieldElement = page.locator(allertForField)
        
            await passwordElement.fill(data)
            await repeatPasswordElement.fill(data)
            await page.click('body')
            await expect(allertForFieldElement).not.toBeVisible();
            await expect(passwordElement).toHaveCSS('border-color','rgb(206, 212, 218)')  
            await expect(repeatPasswordElement).toHaveCSS('border-color','rgb(206, 212, 218)')           
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
            const pageElement = page.locator(selector);
            const allertForFieldElement = page.locator(allertForField)
            
            await pageElement.fill('')
            await page.click('body')
            await expect(allertForFieldElement).toHaveText(allerts[key])
            await expect(pageElement).toHaveCSS('border-color','rgb(220, 53, 69)')    
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
                const pageElement = page.locator(selector);
                const allertForFieldElement = page.locator(allertForField)
                
                await pageElement.fill(testData)
                await page.click('body')
                await expect(allertForFieldElement).toHaveText(allertsOne[key])
                await expect(pageElement).toHaveCSS('border-color','rgb(220, 53, 69)')    
            })
        }        
    }

    for (const [key, selector] of Object.entries(locators)) {
        for (const testData of dataTwo) {
            test(`Check ${key} field error when user enters ${testData}`, async ({ page }) => {
                const pageElement = page.locator(selector);
                const allertForFieldElement = page.locator(allertForField)
                
                await pageElement.fill(testData)
                await page.click('body')
                await expect(allertForFieldElement).toHaveText(allertsTwo[key])
                await expect(pageElement).toHaveCSS('border-color','rgb(220, 53, 69)')    
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
            const emailElement = page.locator(email)            
            const allertForFieldElement = page.locator(allertForField)
        
            await emailElement.fill(data)
            await page.click('body')
            await expect(allertForFieldElement).toHaveText('Email is incorrect')           
            await expect(emailElement).toHaveCSS('border-color','rgb(220, 53, 69)')             
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
            const passwordElement = page.locator(password)            
            const allertForFieldElement = page.locator(allertForField)
            
            await passwordElement.fill(data)
            await page.click('body')
            await expect(allertForFieldElement).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')           
            await expect(passwordElement).toHaveCSS('border-color','rgb(220, 53, 69)')             
        })
    } 

    for (const data of passwords) {
        test(`Check Repeate password field error when user enters ${data}`, async ({ page }) => {
            const repeatPasswordElement = page.locator(repeatPassword)            
            const allertForFieldElement = page.locator(allertForField)
            
            await repeatPasswordElement.fill(data)
            await page.click('body')
            await expect(allertForFieldElement).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')           
            await expect(repeatPasswordElement).toHaveCSS('border-color','rgb(220, 53, 69)')             
        })
    } 

})

test.describe(`Check errors Re-enter password field when Re-enter password does't match with Password`, () => {

    test(`Check errors Re-enter password field when Re-enter password does't match with Password`, async ({ page }) => {
        const passwordElement = page.locator(password)
        const repeatPasswordElement = page.locator(repeatPassword)             
        const allertForFieldElement = page.locator(allertForField)
        
        await passwordElement.fill('Qa12345!')
        await repeatPasswordElement.fill('Qa12345!!')
        await page.click('body')
        await expect(allertForFieldElement).toHaveText('Passwords do not match')           
        await expect(repeatPasswordElement).toHaveCSS('border-color','rgb(220, 53, 69)')             
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
            const nameElement = page.locator(name);
            const lastNameElement = page.locator(lastName);
            const emailElement = page.locator(email);
            const passwordElement = page.locator(password);
            const repeatPasswordElement = page.locator(repeatPassword);             
            const registrationButtonElement = page.locator(registrationButton);            
           
            await nameElement.fill(data.name);
            await lastNameElement.fill(data.lastName);
            await emailElement.fill(data.email);
            await passwordElement.fill(data.password);
            await repeatPasswordElement.fill(data.repeatPassword);            
            
            await expect(registrationButtonElement).toBeDisabled();
        });
    }

})