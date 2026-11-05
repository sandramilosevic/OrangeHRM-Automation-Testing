import { test } from '@playwright/test';
import { LoginPage, LoginOptions } from '../pages/LoginPage';
import loginData from '../data/loginData.json';

const data = loginData as LoginOptions[];

test.describe('Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    for (const item of data) {
        test(item.testcase, async () => {
            await loginPage.login(item);
            await loginPage.verifyLoginStatus(item);
        });
    }
});