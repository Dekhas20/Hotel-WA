window.onload = validate;

document.getElementById("user-cerrar").addEventListener("click", logOut);

function validate() {
    let user = sessionStorage.getItem('user')
    if(user == null){
        document.getElementById('user-reservas').style.display = 'none'
        document.getElementById('user-cerrar').style.display = 'none'
        document.getElementById('user-abrir').style.display = 'block'
    }
}

function logOut() {
    window.location.href = "login.html"
    sessionStorage.clear()
}