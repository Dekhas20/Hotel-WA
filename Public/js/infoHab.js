window.onload = habitacionesDisp;
// setTimeout(() => {
//     let btnReservar = document.getElementById("btn-reservar").addEventListener("click", makeReservation);
    
// }, "3000")

let checkIn = sessionStorage.getItem('checkIn');
let checkOut = sessionStorage.getItem('checkOut');
let adults = sessionStorage.getItem('adults');
let children = sessionStorage.getItem('children');
nights = (Date.parse(checkOut) - Date.parse(checkIn)) / (1000 * 60 * 60 * 24)

function habitacionesDisp() {
    validate()

    people = parseInt(adults) + parseInt(children)

    const token = localStorage.getItem('token')

    fetch('http://127.0.0.1:5000/habitaciones/disp/' + people, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(response => response.json())
        .then(data => mostrarHab(data['data']))
        .catch(err => console.log(err));
}

function mostrarHab(data) {
    // console.log(data)
    let user = sessionStorage.getItem('user')

    if (user == null) {
        alert('Necesitas estar registrado para poder reservar');
        window.location.href = 'login.html'
    }
    let habitaciones = `<div class="row text-center">
            <div class="col mt-4 mb-4">
                <strong style="font-size: 25px;">Habitaciones para ${adults} adultos y ${children} niños</strong>
            </div>
        </div>`;
    if (data.length == 0) {
        habitaciones = `<div class="row text-center">
            <div class="col mt-4 mb-4">
                <strong style="font-size: 25px;">El momento no tenemos habitaciones disponibles para ti</strong>
            </div>
        </div>`
    } else {
        for (let i = 0; i < data.length; i++) {
            habitaciones += `<div class="row">
            <div class="col-2"></div>
            <div class="col">
                <div class="card border-0 shadow mb-4" style="width: 100%; border-radius: 8px;">
                    <div class="row">
                        <div class="col-4">
                            <img src="../Public/img/hab1.jpg" class="img-fluid rounded-start"
                                style="width: 100%; height: 100%;">
                        </div>
                        <div class="col-8">
                            <div class="card-body">
                                <strong class="card-title" style="font-size: 20px;">HABITACIÓN ${data[i].Numero} - PISO ${data[i].Numero.charAt(0)}</strong>
                                <p class="card-text">${data[i].Tipo}</p>
                                <p class="card-text">${data[i].Descripcion}</p>
                                <p class="card-text"><strong class="text-muted"
                                        style="font: 100;color: rgb(1, 207, 1);">$${parseInt(data[i].Precio) * nights} COP por ${nights} noches</strong></p>
                                
                                <img src="../Public/img/wifi.png" width="25px" alt="">
                                <img src="../Public/img/netflix.png" width="25px" alt="">
                                <img src="../Public/img/baño.png" width="25px" alt="">
                                <img src="../Public/img/cubiertos.png" width="25px" alt="">
                                <div class="row mt-3">
                                    <div class="col">
                                        <button type="button" class="btn btn-sm btn-primary" id="btn-reservar1"
                                            style="width: 100%; border-radius: 8px;" data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop" onclick="currentHab(${data[i].id_habitacion})">Reservar</button>
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2"></div>
        </div>`
        }

    }


    document.getElementById('habDisponibles').innerHTML = habitaciones;
}

function currentHab (idHab){
    sessionStorage.setItem('hab', idHab)
}

function makeReservation() {
    // let prueba = document.getElementById("btn-reservar").nextSibling
    // console.log(prueba)

    let user = sessionStorage.getItem('user')
    let userID = sessionStorage.getItem('userID')
    let hab = sessionStorage.getItem('hab')

    const token = localStorage.getItem('token')

    if (user == null) {
        alert('Necesitas iniciar sesión')
        window.location.href = 'login.html'
    } else {
        console.log(userID)
        let reservation = {
            Check_in: checkIn,
            Check_out: checkOut,
            id_habitacion: parseInt(hab),
            id_usuario: parseInt(userID),
            Num_adultos: parseInt(adults),
            Num_ninos: parseInt(children),
            Estado_reserva: 1,
            Total: 150000
        }

        console.log(reservation)

        fetch('http://127.0.0.1:5000/reservas/post', {
            method: "POST",
            body: JSON.stringify(reservation),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                modifyHabitacion(hab);
                let dataPost = data['data']
                let reserva = `
                <div class="row">
                    <div class="col">
                        <div class="card border-0 shadow mb-4" style="width: 100%; border-radius: 8px;">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card-body">
                                        <strong class="card-title" style="font-size: 20px;">Reserva # ${dataPost.id_reserva} </strong>
                                        <p class="card-text">Check-In ${dataPost.Check_in}</p>
                                        <p class="card-text">Check-out ${dataPost.Check_out}</p>
                                        <p class="card-text">Total $${dataPost.Total}</p>
                                        <p class="card-text">Te esperamos en nuestras instalaciones, guarda esta informacion y presentate con tu documento de identificación en la recepcion del hotel</p>
                                        <div class="row mt-3">
                                            <div class="col">
                                                <button type="button" class="btn btn-sm btn-primary" id="btn-inicio"
                                                    style="width: 100%; border-radius: 8px;" ">Volver al inicio</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`

                document.getElementById('habDisponibles').innerHTML = reserva;
                
                document.getElementById("btn-inicio").addEventListener("click", inicio);
            })
            .catch(err => console.log(err));
    }
}

function modifyHabitacion(idHab) {
    const token = localStorage.getItem('token')

    let hab = {
        Estado: 2,
    }

    console.log(idHab)
    fetch('http://127.0.0.1:5000/habitaciones/mod/' + idHab, {
            method: "PUT",
            body: JSON.stringify(hab),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                
            })
            .catch(err => alert('Hubo un error, intentalo mas tarde'));
}

function inicio() {
    window.location.href = "index.html"
}

