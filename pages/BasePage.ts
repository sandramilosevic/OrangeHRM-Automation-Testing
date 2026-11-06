import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
    constructor(readonly page: Page) {}

    abstract get url(): string;

    readonly successToast = this.page.locator('.oxd-text--toast-message');
    
    protected group(label: string, exact = false): Locator {
        return this.page
            .locator('.oxd-input-group')
            .filter({
                has: exact
                    ? this.page.getByText(label, { exact: true })
                    : this.page.locator('label', { hasText: label }),
            });
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async verifyUrl(urlPattern: RegExp | string) {
        await expect(this.page).toHaveURL(urlPattern);
    }

    async verifyText(locator: Locator, expectedText: string | RegExp) {
        await expect(locator).toContainText(expectedText);
    }

    async verifyTextOnPage(text: string) {
        await this.verifyText(this.page.getByText(text).first(), text);
    }

    async verifySuccessToast() {
        await this.verifyText(this.successToast, /success/i);
    }

    async fillForm(fields: [Locator, string][], submitBtn?: Locator) {
        for (const [locator, value] of fields) {
            await locator.fill(value);
        }
        await submitBtn?.click();
    }

    async selectDropdown(dropdown: Locator, option: string) {
        await dropdown.click();
        await this.page.getByRole('option', { name: option, exact: true }).click();
}

    protected getCredentials(options: { valid: boolean; username?: string; password?: string }) {
        return {
            username: options.valid ? process.env.TEST_USERNAME! : (options.username ?? ''),
            password: options.valid ? process.env.TEST_PASSWORD! : (options.password ?? '')
        };
    }}
