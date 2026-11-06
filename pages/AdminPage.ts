import { BasePage } from './BasePage';



export class AdminPage extends BasePage {
    get url() {
        return '/web/index.php/admin/viewSystemUsers';
    }

    

    readonly addBtn = this.page.getByRole('button', { name: 'Add' });
    readonly saveBtn = this.page.getByRole('button', { name: 'Save' });

    readonly username = this.group('Username').locator('input');
    readonly password = this.group('Password', true).locator('input');
    readonly confirmPassword = this.group('Confirm Password').locator('input');
    readonly employeeName = this.group('Employee Name').locator('input');

    readonly userRole = this.group('User Role').locator('.oxd-select-text');
    readonly status = this.group('Status').locator('.oxd-select-text');

    async selectEmployee(name: string) {
        await this.employeeName.fill(name);
        await this.page.getByRole('option').filter({ hasText: name }).first().click();
    }

    async addUser(data: {
        role: string;
        employee: string;
        status: string;
        username: string;
        password: string;
    }) {
        await this.addBtn.click();
        await this.selectDropdown(this.userRole, data.role);
        await this.selectEmployee(data.employee);
        await this.selectDropdown(this.status, data.status);
        await this.fillForm(
            [
                [this.username, data.username],
                [this.password, data.password],
                [this.confirmPassword, data.password],
            ],
            this.saveBtn,
        );
    }
}