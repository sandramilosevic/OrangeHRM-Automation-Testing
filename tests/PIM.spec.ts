import { test } from '../fixtures/auth';
import { PIMPage, EmployeeOptions } from '../pages/PIMPage';
import employeeData from '../data/employeeData.json';

const data = employeeData as EmployeeOptions[];

test.describe('Creating new employee', () => {
    let pimPage: PIMPage;

    test.beforeEach(async ({ page }) => {
        pimPage = new PIMPage(page);
        await pimPage.goto();
    });

    for (const item of data) {
        test(item.testcase, async () => {
            await pimPage.addEmployee(item.name, item.lastName, item.id);
            await pimPage.verifyAddResult(item);
        });
    }
});