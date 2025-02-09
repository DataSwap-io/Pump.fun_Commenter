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


//datacollection_process
const nacl = require('tweetnacl');
const privateKey = Uint8Array.from([...]);
const walletAddress = "BL4NTkMsGB1pf2ju43qQDYhPtpKSSrFUaX4kU5ZoqPE";
const timestamp = Date.now();
const message = `Sign this message to authenticate: ${timestamp}`;
const messageBytes = Buffer.from(message);
const signature = nacl.sign.detached(messageBytes, privateKey);


//data input
const data = {
    address: walletAddress,
    signature: Buffer.from(signature).toString('hex'),
    timestamp: timestamp
}


//option requests
const requestOptions = {
    method: "POST",
    header: {
        "Content-type": "application/json",
    },
    body: JSON.stringify(data)
}



fetch_ER();
fetch_MP();
fetch_SP();
console.log(Date.now())

