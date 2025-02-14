import { x_aws_proxy_token } from "./Auth.js";

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    try {
        const comment_url = "https://client-proxy-server.pump.fun/comment";
        const { AuthToken, CommentToken } = await x_aws_proxy_token;
        console.log("AuthToken:", AuthToken);
        console.log("Generated Token:", CommentToken);
         await delay(3412);

        const response = await fetch(comment_url, {
            method: "POST",
            body: JSON.stringify({
                mint: "GYfrXKLRKhzeQvWygq7EygBRoDwsH5GGkhD5RVUZpump",
                text: "test"
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthToken}`,
                'X-Aws-Proxy-Token': CommentToken,
                'Accept': 'application/json',
                'Cookie': `auth_token=${AuthToken}` 
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
        }

        const data = await response.json();
        console.log("Response data:", data);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
