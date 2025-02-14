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
        await delay(6412);
        const response = await fetch(comment_url, {
            method: "POST",
            body: JSON.stringify({
                mint: "CUSbQC3LLB5w6ZjZSAaY9mTnc6kR4igufVMsN9tBQyvm",
                text: "Thommi3 & tr4m0ryp zijn de bot aan het testen; als je dit ziet werkt de bot:))))"
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthToken}`,
                'X-Aws-Proxy-Token': CommentToken,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                'Origin': 'https://pump.fun',
                'Referer': 'https://pump.fun/',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
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
