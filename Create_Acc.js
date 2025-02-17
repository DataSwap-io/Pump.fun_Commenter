import fetch from "node-fetch";
import chalk from "chalk";
import { faker } from '@faker-js/faker';
import { getAuthToken } from './login.js';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    try {
        const authToken = await getAuthToken();
        console.log(`De gegenereerde token is: ${authToken}`);
        await delay(10000);
        const username = genUsername();
        const bio = genBio();

        const url = "https://frontend-api-v3.pump.fun/users";

        const payload = {
            "bio": bio,
            "username": username,
        };

        const headers = {
            "Cookie": `auth_token=${authToken}`,
            "Content-Type": "application/json"
        };

        const req = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        const res = await req.json();

        if (!req.ok) {
            console.error(chalk.redBright("Failed to create profile:", JSON.stringify(res, null, 2)));
        }

        console.log(chalk.greenBright(`Profile created \nUsername: ${res.username}\nBio: ${res.bio}`));
        return authToken; // Retourneer de authToken
    } catch (error) {
        console.error(chalk.redBright("Error:", error));
    }
}

function genUsername() {
    let username = '';
    while (username.length === 0 || username.length > 10 || !/^[a-zA-Z0-9_]+$/.test(username)) {
        username = faker.internet.userName().replace(/[^a-zA-Z0-9_]/g, '_');
    }
    return username;
}

function genBio() {
    let bioList = [
        'hallo nig',
        'thomas de trein',
        'trein de thomas',
        'crypto whale',
        "beauty star",
        'megatron',
        "biooology"
    ];

    let randomChoice = Math.floor(Math.random() * bioList.length);
    return bioList[randomChoice];
}

// Exporteer de main functie en de authToken
export const Auth_Comment = main();
