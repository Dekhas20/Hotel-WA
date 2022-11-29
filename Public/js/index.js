document.getElementById("login").addEventListener("click", login);

function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    fetch('http://127.0.0.1:5000/login/' + email + "/" + pass)
    .then(response => response.json())
    .then(data => {
        if(data['statusCode'] == 200){
            token();
            sessionStorage.setItem('user', email)
            window.location.href = 'index.html'
        }else {
            alert('Credenciales invalidas')
        }
    })
    .catch(err => console.log(err)); 
}

function token() {
    fetch('http://127.0.0.1:5000/token')
        .then(response => response.json())
        .then(data => localStorage.setItem('token', data['token'])
        )
        .catch(err => console.log(err));
}
