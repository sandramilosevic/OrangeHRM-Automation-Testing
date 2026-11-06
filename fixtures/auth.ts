import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page, request }, use) => {
    const html = await (await request.get('/web/index.php/auth/login')).text();
    const token = html.match(/:token="&quot;(.+?)&quot;"/)?.[1];
    if (!token) throw new Error('CSRF token nije pronađen');

    const response = await request.post('/web/index.php/auth/validate', {
      form: {
        _token: token,
        username: process.env.TEST_USERNAME!,
        password: process.env.TEST_PASSWORD!,
      },
    });
    expect(response.ok()).toBeTruthy();

    const { cookies } = await request.storageState();
    await page.context().addCookies(cookies);

    await use(page);
  },
});

export { expect };