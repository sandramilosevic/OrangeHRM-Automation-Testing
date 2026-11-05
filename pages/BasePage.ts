import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
    constructor(readonly page: Page) {}

    abstract get url(): string;

    async goto() {
        await this.page.goto(this.url);
    }

    async verifyUrl(urlPattern: RegExp | string) {
        await expect(this.page).toHaveURL(urlPattern);
    }

    async verifyText(locator: Locator, expectedText: string) {
        await expect(locator).toHaveText(expectedText);
    }

    protected getCredentials(options: { valid: boolean; username?: string; password?: string }) {
        return {
            username: options.valid ? process.env.TEST_USERNAME! : (options.username ?? ''),
            password: options.valid ? process.env.TEST_PASSWORD! : (options.password ?? '')
        };
    }
}