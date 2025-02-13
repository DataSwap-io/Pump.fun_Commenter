import { getAuthToken } from './login.js';

async function main() {
    try {
        const comment_url = "https://client-proxy-server.pump.fun/comment";
        const Authorization = await getAuthToken();
        console.log(`The generated key is ${Authorization}`);

        const response = await fetch(comment_url, {
            method: "POST",
            body: JSON.stringify({
                mint: "GYfrXKLRKhzeQvWygq7EygBRoDwsH5GGkhD5RVUZpump",
                text: "test"
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization,
                'X-Aws-Proxy-Token': 'xxxx'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
