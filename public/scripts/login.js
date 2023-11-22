const socket = io();

const input_username = document.querySelector(".username");
const input_password = document.querySelector(".password");

const btn_continue = document.querySelector(".btn-continue");



btn_continue.addEventListener('click', function() {
    const username = input_username.value;
    const password = input_password.value;

    console.log("username: " + username);
    console.log("password: " + password);

    send_login(username, password)
})



function send_login(username, password) {
    socket.emit('login', {username, password});
}


// Probably shouldn't have the function that confirms the login, on client side 
// to prevent people from just calling the function manually and basiclly bypassing login right?
socket.on('login_confirm', () => {
    window.location.href = "http://localhost:3000/grade";
})