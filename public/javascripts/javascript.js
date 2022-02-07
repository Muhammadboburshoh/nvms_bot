var myHeaders = new Headers();
myHeaders.append("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IjExOC1tYWt0YWIiLCJsb2dpbiI6IjExOCIsImlhdCI6MTY0NDIxODQ4MSwiZXhwIjoxNjQ3ODE4NDgxfQ.bWBqrg8Kk4OegmZSqmjMgbKoSB74dEITaJD-2OeFfO0");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3002", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));