import { test } from '@playwright/test';
import { AdminPage, UserOptions } from '../pages/AdminPage';
import adminData from '../data/adminData.json';

const data = adminData as UserOptions[];

test.describe('Admin - Users', () => {
    let adminPage: AdminPage;

    test.beforeEach(async ({ page }) => {
        adminPage = new AdminPage(page);
        await adminPage.goto();
    });

    for (const item of data) {
        test(item.testcase, async () => {
            test.fail(!!item.knownBug, item.knownBug);
            await test.step('Add user', () => adminPage.addUser(item));
            await test.step('Verify result', () => adminPage.verifyAddUserResult(item));
        });
    }
});