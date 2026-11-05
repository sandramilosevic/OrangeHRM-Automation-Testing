import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PIMPage, EmployeeOptions } from '../pages/PIMPage';
import employeeData from '../data/employeeData.json';

const data = employeeData as EmployeeOptions[];

test.describe('Creating new employee', () => {
    let pimPage: PIMPage;

    test.beforeEach(async ({ page }) => {
        await new LoginPage(page).login({ testcase: 'admin', valid: true });
        pimPage = new PIMPage(page);
        await pimPage.goto();
    });

    for (const item of data) {
        test(item.testcase, async () => {
            await pimPage.addEmployee(item.name, item.lastName, item.id);

            // TO DO verifyAddResults
            await pimPage.verifyAddResult(item);
        });
    }
});