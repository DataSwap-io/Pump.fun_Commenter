import fetch from "node-fetch";
import chalk from "chalk";
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

const login_url = "https://frontend-api-v3.pump.fun/auth/login";

function generateSingleWallet() {
    const keyPair = Keypair.generate();
    return {
        address: keyPair.publicKey.toString(),
        privateKey: bs58.encode(keyPair.secretKey),
        secretKey: keyPair.secretKey
    };
}


async function POST_login(wallet) {
    try {
        const timestamp = Date.now();
        console.log("Raw timestamp:", timestamp);
        console.log("ISO timestamp:", new Date(timestamp).toISOString());
        const decodedPrivateKey = bs58.decode(wallet.privateKey);
        const privateKey = decodedPrivateKey.slice(0, 32);
        const keypair = nacl.sign.keyPair.fromSeed(privateKey);
        const message = new TextEncoder().encode(Sign in to pump.fun: ${timestamp});
        const signature = nacl.sign.detached(message, keypair.secretKey);
        const encodedSignature = bs58.encode(signature);
        console.log(`You 're signing the message: ${encodedSignature}`)
        const loginData = {
            address: wallet.address,
            signature: encodedSignature,
            timestamp: timestamp
        };

        console.log(chalk.yellow("\nAttempting login with wallet:"));
        console.log(chalk.blue("Address:"), wallet.address);
        console.log(chalk.blue("Timestamp:"), timestamp);

        const response = await fetch(login_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                "Origin": "https://pump.fun",
                "Referer": "https://pump.fun/",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.9",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site"
            },
            body: JSON.stringify(loginData)
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(HTTP ${response.status}: ${errorText});
        }

        const cookies = response.headers.get('set-cookie');
        console.log(chalk.green("Success! De volgende Received cookies:"), cookies);
        return cookies;

    } catch (error) {
        console.error(chalk.red("Login errosr:"), error.message);
        return null;
    }
}

(async () => {
    try {
        const wallet = generateSingleWallet();
        
        console.log(chalk.green("\nGenerated Wallet:"));
        console.log(chalk.blue("Address:"), wallet.address);
        console.log(chalk.blue("Private Key (b58):"), wallet.privateKey);
        console.log(chalk.blue("Secret Key (hex):"), Buffer.from(wallet.secretKey).toString('hex'));

        await POST_login(wallet);

    } catch (error) {
        console.error(chalk.red("Fatal error:"), error);
    }
})();
