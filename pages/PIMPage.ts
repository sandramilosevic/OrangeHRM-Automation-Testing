import { BasePage } from './BasePage';

export class PIMPage extends BasePage {
    get url(): string {
        return '/web/index.php/pim/viewEmployeeList';
    }

    // PIM list
    readonly addBtn = this.page.getByRole('button', { name: 'Add' });
    readonly searchBtn = this.page.getByRole('button', { name: 'Search' });

    // PIM search
    readonly employeeName = this.page.getByLabel('Employee Name');

    // Add employee
    readonly firstName = this.page.getByRole('textbox', { name: 'First Name' });
    readonly middleName = this.page.getByRole('textbox', { name: 'Middle Name' });
    readonly lastName = this.page.getByRole('textbox', { name: 'Last Name' });
    readonly employeeId = this.page.locator('.oxd-input-group', { hasText: 'Employee Id' }).getByRole('textbox');
    readonly saveBtn = this.page.getByRole('button', { name: 'Save' }); 
    
    async addEmployee(first: string, last: string, id: string) {
        await this.addBtn.click();
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.employeeId.fill(id);
        await this.saveBtn.click();
    }
}