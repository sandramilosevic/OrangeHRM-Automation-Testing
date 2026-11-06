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

    async login(options: LoginOptions) {
        const { username, password } = this.getCredentials(options);
        await this.fillForm(
            [
                [this.usernameInput, username],
                [this.passwordInput, password],
            ],
            this.loginBtn
        );
    }

    async verifyLoginStatus(options: LoginOptions) {
        await this.verifyUrl(options.valid ? /dashboard/ : /login/);
        if (options.expectedError) await this.verifyTextOnPage(options.expectedError);
    }
}