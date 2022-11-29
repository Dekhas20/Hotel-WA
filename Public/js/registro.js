document.getElementById("btn-seguir").addEventListener("click", register);
document.getElementById("btn-continuar").addEventListener("click", backToLogin);

function register(){
    let name = document.getElementById("input-name").value
    let lastname = document.getElementById("input-lastname").value
    let typeDocument = document.getElementById("input-document").value
    let cc = document.getElementById("input-cc").value
    let email = document.getElementById("input-email").value
    let age = document.getElementById("input-age").value
    let phone = document.getElementById("input-phone").value
    let gender = document.getElementById("input-gender").value
    let nationality = document.getElementById("input-nationality").value
    let city = document.getElementById("input-city").value
    let address = document.getElementById("input-address").value
    let pass = document.getElementById("input-pass").value
    let passConfirm = document.getElementById("input-pass-confirm").value

    if(name.length!=0 && lastname.length!=0 && typeDocument!=0 && cc.length!=0 && email.length!=0 && age.length!=0 && gender!=0 && nationality.length!=0 && phone.length!=0 && city.length!=0 && address.length!=0 && pass.length != 0 && passConfirm.length!=0) {
        console.log('entro')

        if(pass != passConfirm){
            alert('Las contraseñas no coinciden')
        }else {
            let user = {
                Nombres: name,
                Apellidos: lastname,
                Email: email,
                Direccion: address,
                Cedula: cc,
                Celular: phone,
                Rol: 3,
                Contraseña: pass
            }
    
    
            fetch('http://127.0.0.1:5000/usuario/post', {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    $("#staticBackdrop").modal('show')
                    
                })
                .catch(err => alert('Hubo un error, intentalo mas tarde'));
        }

        

    }else {
        $("#staticBackdropFail").modal('show')
    }
}

function backToLogin(){
    window.location.href = 'login.html'
}