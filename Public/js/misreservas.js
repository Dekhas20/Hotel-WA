window.onload = reservations;

function reservations(){

    validate()
    const token = localStorage.getItem('token')
    let user = sessionStorage.getItem('user')
    // console.log(user)

    fetch('http://127.0.0.1:5000/reservas/' + user, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(response => response.json())
        .then(data => {

            data = data['data']

            let body = '';
            for (let i = 0; i < data.length; i++){
                body += `
                <tr>
                    <td>${data[i].id_reserva}</td>
                    <td>${new Date(Date.parse(data[i].Check_in)).toLocaleDateString()}</td>
                    <td>${new Date(Date.parse(data[i].Check_out)).toLocaleDateString()}</td>
                    <td>${data[i].num_adultos}</td>
                    <td>${data[i].num_niños}</td>
                    <td>$${data[i].Total}</td>
                </tr>`
            }

            document.getElementById('data').innerHTML = body;
        })
        .catch(err => console.log(err));
}