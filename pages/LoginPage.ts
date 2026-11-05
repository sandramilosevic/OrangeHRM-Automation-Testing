import { BasePage } from './BasePage';

export type LoginOptions = {
    testcase: string;
    valid: boolean;
    username?: string;
    password?: string;
    expectedError?: string;
};

export class LoginPage extends BasePage {
    get url(): string {
        return '/web/index.php/auth/login';
    }

    readonly usernameInput = this.page.getByPlaceholder('Username');
    readonly passwordInput = this.page.getByPlaceholder('Password');
    readonly loginBtn = this.page.getByRole('button', { name: 'Login' });

    readonly errorMessage = this.page.getByRole('alert');
    readonly requiredMessage = this.page.getByText('Required');

    async login(options: LoginOptions) {
        const { username, password } = this.getCredentials(options);
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }

    async verifyLoginStatus(options: LoginOptions) {
        await this.verifyUrl(options.valid ? /dashboard/ : /login/);
        if (options.expectedError) await this.verifyErrorMessage(options.expectedError);
    }

    async verifyErrorMessage(expectedText: string) {
        const locator = expectedText === 'Required' ? this.requiredMessage : this.errorMessage;
        await this.verifyText(locator, expectedText);
    }
}