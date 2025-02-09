const my_profile_url = "https://frontend-api-v3.pump.fun/auth/my-profile"
const login_url = "https://frontend-api-v3.pump.fun/auth/login"
const sol_price = "https://frontend-api-v3.pump.fun/sol-price"
const eras = "https://frontend-api-v3.pump.fun/eras" 



function fetch_MP () {
    fetch(my_profile_url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("my_profile_url", data);
    });
}

function fetch_LU () {
    fetch(login_url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("login_url", data);
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

function fetch_ER () {
    fetch(eras)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("era", data);
    });
}


fetch_MP();
fetch_ER();
fetch_LU();
fetch_ER();
