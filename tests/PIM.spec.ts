import { test } from '../fixtures/auth'
import { PIMPage, PimOptions } from '../pages/PIMPage';
import pimData from '../data/pimData.json';

const data = pimData as PimOptions[];

test.describe('PIM', () => {
    let pimPage: PIMPage;

    test.beforeEach(async ({ page }) => {

        pimPage = new PIMPage(page);
        await pimPage.goto();
    });

    for (const item of data) {
        test(item.testcase, async () => {
            test.fail(!!item.knownBug, item.knownBug);
            await test.step('Perform action', () => pimPage.perform(item));
            await test.step('Verify result', () => pimPage.verifyResult(item));
        });
    }
});