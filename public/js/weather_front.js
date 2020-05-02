/**Client side js file */

   
const weatherform = document.querySelector('form');
const divInfo = document.querySelector('#weatherInfo');
const divError = document.querySelector('#error')



weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
   
   const location = document.querySelector('input').value;
    divError.textContent = 'En cours...'
    fetch(`http://localhost:3000/getweather/${location}`)
    .then((response) => {
      response.json().then((data) => {
         divInfo.textContent=data.weatherInfo
         divError.innerHTML=`<img src=${data.weatherIcon}>` 
      })
    })
    .catch(error => {divError.textContent=error});
});