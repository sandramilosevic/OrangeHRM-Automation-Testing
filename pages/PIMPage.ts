import { BasePage } from './BasePage';

export type EmployeeOptions = {
    testcase: string;
    name: string;
    lastName: string;
    id: string;
    valid: boolean;
    expectedError?: string;
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

    // Add employee
    readonly firstName = this.page.getByRole('textbox', { name: 'First Name' });
    readonly middleName = this.page.getByRole('textbox', { name: 'Middle Name' });
    readonly lastName = this.page.getByRole('textbox', { name: 'Last Name' });
    readonly employeeId = this.page.locator('.oxd-input-group', { hasText: 'Employee Id' }).getByRole('textbox');
    readonly saveBtn = this.page.locator('button[type="submit"]');

    async addEmployee(first: string, last: string, id: string) {
        const employeeId = id === 'unique' ? Date.now().toString().slice(-6) : id;
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

    async verifyAddResult(item: EmployeeOptions) {
        if (item.valid) {
            await this.verifySuccessToast();
            await this.verifyUrl(/pim\/viewPersonalDetails\/empNumber\/\d+/);
        } else {
            await this.verifyTextOnPage(item.expectedError!);
            await this.verifyUrl(/addEmployee/);
        }
    }
}