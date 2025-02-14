import { x_aws_proxy_token } from "./Auth.js";

async function main() {
    try {
        const comment_url = "https://client-proxy-server.pump.fun/comment";
        const { AuthToken, CommentToken } = await x_aws_proxy_token ;
        console.log("AuthToken:", AuthToken);
        console.log("Generated Token:", CommentToken);

        const response = await fetch(comment_url, {
            method: "POST",
            body: JSON.stringify({
                mint: "GYfrXKLRKhzeQvWygq7EygBRoDwsH5GGkhD5RVUZpump",
                text: "test"
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthToken,
                'X-Aws-Proxy-Token': CommentToken
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
