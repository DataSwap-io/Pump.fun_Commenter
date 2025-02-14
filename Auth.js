import { Auth_Comment } from './Create_Acc.js';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const url = "https://frontend-api-v3.pump.fun/token/generateTokenForThread";

async function generateToken() {
  try {
    const authToken = await Auth_Comment;
    console.log(authToken);
    await delay(3130);
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
    return {
      AuthToken: authToken,
      CommentToken: data.token
    };
  } catch (error) {
    console.error("Fout bij het genereren van de token:", error);
  }
}

generateToken();

export const x_aws_proxy_token = generateToken();
