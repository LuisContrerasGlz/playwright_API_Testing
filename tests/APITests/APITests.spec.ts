import { test, expect } from '@playwright/test';

const REPO = process.env.REPO_Name;
const USER = process.env.USER_Name;

test('Puedo crear un bug en el repo', async ({ request }) => {
    const apiToken = process.env.API_Token;

    // Print the token value (ensure this is safe to do)
    console.log('El valor de API_Token es:', apiToken);
    console.log('El repo es:', REPO);
    console.log('El usern es:', USER);

    // Perform the POST request to create a new issue
    const newIssue = await request.post(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
        headers: {
            'Authorization': `token ${apiToken}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        data: {
            "title": "[Bug2] sigue explotando todo",
            "body": "Estamos peenjidirijillos",
            "assignees": ["conromo64"],  // Replace with actual username(s)
            "labels": ["bug"]  // Replace with the labels you want to use
        }
    });

    // Print the status code
    console.log('Status:', newIssue.status());
    expect(newIssue.status()).toBe(201);

    // Optionally, fetch issues to confirm creation
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
        body: 'Estamos peenjidirijillos'
    }));
});
