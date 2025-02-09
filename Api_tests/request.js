const my_profile_url = "https://frontend-api-v3.pump.fun/auth/my-profile"
const login_url = "https://frontend-api-v3.pump.fun/auth/login"
const sol_price = "https://frontend-api-v3.pump.fun/sol-price"
const eras = "https://frontend-api-v3.pump.fun/eras" 


//get responses
function fetch_ER () {
    fetch(eras)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("era", data);
    });
}
function fetch_MP () {
    fetch(my_profile_url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("my_profile_url", data);
    });
}

function fetch_SP () {
    fetch(sol_price)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("sol_price", data);
    });
}

//wallet_gen
const nacl = require('tweetnacl');
const { Keypair } = require('@solana/web3.js');
const keypair = Keypair.generate();
const privateKey = keypair.secretKey;
const walletAddress = keypair.publicKey.toString();
console.log("New Wallet Address:", walletAddress);
console.log("New Private Key:", Buffer.from(privateKey).toString('hex')); 


//POST data voorverwerking
const timestamp = Date.now();
const message = `Sign this message to authenticate: ${timestamp}`;
const messageBytes = Buffer.from(message);
const signature = nacl.sign.detached(messageBytes, privateKey);
console.log("Signature:", Buffer.from(signature).toString('hex')); 

//POST-DATA
const data = {
    address: walletAddress,
    signature: Buffer.from(signature).toString('hex'),
    timestamp: timestamp
};

console.log(data)

//option requests
const requestOptions = {
    method: "POST",
    header: {
        "Content-type": "application/json",
    },
    body: JSON.stringify(data)
}

function POST_login(){
    fetch(login_url, requestOptions)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log("Login Response:", JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error

('Error:', error);
  });

}


POST_login();


//fetch_ER();
//fetch_MP();
//fetch_SP();
//console.log(Date.now())

