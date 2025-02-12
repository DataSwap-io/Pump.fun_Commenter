import fetch from "node-fetch";
import chalk from "chalk";
import { faker } from '@faker-js/faker';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js'; 

const my_profile_url = "https://frontend-api-v3.pump.fun/auth/my-profile"
const login_url = "https://frontend-api-v3.pump.fun/auth/login"
const sol_price = "https://frontend-api-v3.pump.fun/sol-price"
const eras = "https://frontend-api-v3.pump.fun/eras"


//wallet_gen
const keypair = Keypair.generate();
const privateKey = keypair.secretKey;
const walletAddress = keypair.publicKey.toString();
console.log("New Wallet Address:", walletAddress);
console.log("New Private Key:", Buffer.from(privateKey).toString('hex'));


const timestamp = Date.now();
const timestampString = Date.now();
const message = `Sign in to pump.fun: ${timestampString}`;
console.log("Boodschap die wordt ondertekend:", message);
const messageBytes = Buffer.from(message);
const signature = nacl.sign.detached(messageBytes, privateKey);
console.log("Signature:", Buffer.from(signature).toString('hex'));

const loginData = {
    address: walletAddress,
    signature: Buffer.from(signature).toString('hex'),
    timestamp: timestamp
};

console.log("Login Data Payload:", loginData)

const loginRequestOptions = {
    method: "POST",
    headers: {
        "Content-Type": 'application/json; charset=utf-8'
    },
    body: JSON.stringify(loginData)
}

let authTokenCookie = ""; 
// Variabele om auth_token op te slaan

function POST_login(){
    fetch(login_url, loginRequestOptions)
  .then(response => {
    console.log("Login Response Status:", response.status);
    if (!response.ok) {
      console.log("Login Response Headers:", response.headers);
      return response.text().then(text => {
        console.log("Ruwe Login Response Text (geen JSON):", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      });
    }

    
    const setCookieHeader = response.headers.get('Set-Cookie');
    if (setCookieHeader) {
      const cookiesArray = setCookieHeader.split(';');
      for (const cookie of cookiesArray) {
        if (cookie.trim().startsWith('auth_token=')) {
          authTokenCookie = cookie.trim().substring('auth_token='.length);
          console.log("Auth Token Cookie Extracted:", authTokenCookie);
          break;
        }
      }
    } else {
      console.warn("Warning: No Set-Cookie header found in login response.");
    }


    return response.json();
  })
  .then(loginResponseData => {
    console.log("Login Response JSON:", JSON.stringify(loginResponseData, null, 2));

    if (authTokenCookie) {
      createProfileWithToken(authTokenCookie)
        .then(profileCreated => {
          if (profileCreated) {
            console.log(chalk.greenBright("Profile creation flow completed successfully!"));
          } else {
            console.error(chalk.redBright("Profile creation failed after successful login."));
          }
        });
    } else {
      console.error(chalk.redBright("Error: No auth_token cookie obtained after login. Cannot create profile."));
    }


  })
  .catch(error => {
    console.error('Fetch Error:', error);
  });

}


POST_login();
