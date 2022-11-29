window.onload = minDates;
document.getElementById("reservar").addEventListener("click", reservar);


var fecha = new Date();
var anio = fecha.getFullYear();
var dia = fecha.getDate();
let dia2 = dia + 1;
var _mes = fecha.getMonth(); //viene con valores de 0 al 11
_mes = _mes + 1; //ahora lo tienes de 1 al 12
if (_mes < 10) //ahora le agregas un 0 para el formato date
{
  var mes = "0" + _mes;
} else {
  var mes = _mes.toString();
}

let fecha_minimo = anio + '-' + mes + '-' + dia;
let fecha_minimo2 = anio + '-' + mes + '-' + dia2;

function minDates(){
  validate()
    document.getElementById("dateIn").setAttribute('min',fecha_minimo);
    document.getElementById("dateOut").setAttribute('min',fecha_minimo2);

}

function reservar() {
    let checkIn = document.getElementById("dateIn").value
    let checkOut = document.getElementById("dateOut").value
    let adults = document.getElementById("adults").value
    let children = document.getElementById("children").value

    if(checkOut.length > 0 && checkIn.length > 0 && adults.length > 0 && children.length > 0){    
        sessionStorage.setItem('checkIn', checkIn)
        sessionStorage.setItem('checkOut', checkOut)
        sessionStorage.setItem('children', children)
        sessionStorage.setItem('adults', adults)
    
        window.location.href = 'info_habitacion.html'
    }

}