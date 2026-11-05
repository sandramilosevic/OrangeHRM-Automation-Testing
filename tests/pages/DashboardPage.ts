import {Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    constructor (page: Page) {
        super(page);
    }

    get url():string {
        return '/dashboard';
    }

    // Locators
    get welcomeMessage(): Locator {
        return this.page.getByRole('heading', {name: /Welcome/ });
    }

    get userMenu(): Locator {
        return this.page.getByRole('button', {name: 'User menu'});
    }

    get logoutButton(): Locator {
        return this.page.getByRole('menuitem', {name: 'Logout'});
    }

    get settingsLink(): Locator {
        return this.page.getByRole('link', {name:'Settings'});
    }

    // Actions
    async logout(): Promise<void> {
        await this.userMenu.click();
        await this.logoutButton.click();
    }

    async navigateToSettings(): Promise<void> {
        await this.settingsLink.click();
    }
}