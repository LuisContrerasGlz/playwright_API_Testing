import { test, expect } from '@playwright/test';

const REPO = process.env.REPO_Name;
const USER = process.env.USER_Name;

test('Puedo crear un bug en el repo', async ({ request }) => {
    const apiToken = process.env.API_Token;
    const newIssue = await request.post(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
        headers: {
            'Authorization': `token ${apiToken}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        data: {
            "title": '[Bug2] sigue explotando todo',
            "body":     'body del issue ',
            "assignees": ["conromo64"],  
            "labels": ["bug"]  
        }
    });
    console.log('Status:', newIssue.status());
    expect(newIssue.status(), 'no se creo el issue correctamente').toBe(201);
    const issues = await request.get(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
        headers: {
            'Authorization': `token ${apiToken}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    expect(issues.ok()).toBeTruthy();
    const issuesList = await issues.json();
    expect(issuesList).toContainEqual(expect.objectContaining({
        title: '[Bug2] sigue explotando todo',
        body: 'body del issue '
    }));
});