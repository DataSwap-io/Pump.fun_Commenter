import { getAuthToken } from './login.js';


const authToken = getAuthToken();
console.log(authToken);

const url = "https://frontend-api-v3.pump.fun/token/generateTokenForThread";

async function generateToken() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `auth_token=${authToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Token gegenereerd:", data.token);
  } catch (error) {
    console.error("Fout bij het genereren van de token:", error);
  }
}

generateToken();
