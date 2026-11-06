import { BasePage } from './BasePage';

export type PimOptions = {
    testcase: string;
    valid: boolean;
    name?: string;
    lastName?: string;
    id?: string;
    search?: string;
    expectedError?: string;
    knownBug?: string;
};

export class PIMPage extends BasePage {
    get url(): string {
        return '/web/index.php/pim/viewEmployeeList';
    }

    // PIM list
    readonly addBtn = this.page.getByRole('button', { name: 'Add' });
    readonly searchBtn = this.page.getByRole('button', { name: 'Search' });

    // PIM search
    readonly employeeName = this.page.locator('.oxd-input-group', { hasText: 'Employee Name' }).getByRole('textbox');
    readonly recordsFound = this.page.getByText(/Record(s)? Found/);
    readonly noRecords = this.page.getByText('No Records Found');

    // Add employee
    readonly firstName = this.page.getByRole('textbox', { name: 'First Name' });
    readonly middleName = this.page.getByRole('textbox', { name: 'Middle Name' });
    readonly lastName = this.page.getByRole('textbox', { name: 'Last Name' });
    readonly employeeId = this.page.locator('.oxd-input-group', { hasText: 'Employee Id' }).getByRole('textbox');
    readonly saveBtn = this.page.locator('button[type="submit"]');

    async goto() {
        await super.goto();
        await this.addBtn.waitFor({ state: 'visible', timeout: 60_000 });
    }

    async perform(item: PimOptions) {
        if (item.search !== undefined) {
            await this.searchEmployee(item.search);
        } else {
            await this.addEmployee(item.name!, item.lastName!, item.id!);
        }
    }

    async verifyResult(item: PimOptions) {
        if (item.search !== undefined) {
            await this.verifySearchResult(item);
        } else {
            await this.verifyAddResult(item);
        }
    }

    async addEmployee(first: string, last: string, id: string) {
        const employeeId = id === 'unique'
            ? String(Math.floor(Math.random() * 9e8 + 1e8))
            : id;
        await this.addBtn.click();
        await this.fillForm(
            [
                [this.firstName, first],
                [this.lastName, last],
                [this.employeeId, employeeId],
            ],
            this.saveBtn
        );
    }

    async searchEmployee(text: string) {
        await this.fillForm([[this.employeeName, text]], this.searchBtn);
    }

    async verifyAddResult(item: PimOptions) {
        if (item.valid) {
            await this.verifySuccessToast();
            await this.verifyUrl(/pim\/viewPersonalDetails\/empNumber\/\d+/);
        } else {
            await this.verifyTextOnPage(item.expectedError!);
            await this.verifyUrl(/addEmployee/);
        }
    }

    async verifySearchResult(item: PimOptions) {
        if (item.valid) {
            await this.verifyText(this.recordsFound, /Found/);
        } else {
            await this.verifyText(this.noRecords, 'No Records Found');
        }
    }
}