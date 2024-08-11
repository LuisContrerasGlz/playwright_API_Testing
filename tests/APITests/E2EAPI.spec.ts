import { test, expect } from '@playwright/test';

const REPO = process.env.REPO_Name;
const USER = process.env.USER_Name;

let apiContext;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${process.env.API_Token}`, 
        },
    });
});

test.afterAll(async ({ }) => {
    // Cierra el contexto de la API
    await apiContext.dispose();
});

test('El último issue creado es el primero en la lista', async ({ page }) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Que el framework me planche la ropa',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();
    await expect(firstIssue).toHaveText('[Feature] Que el framework me planche la ropa');
    page.close();
});
