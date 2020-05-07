/**Client side js file */

   
const weatherform = document.querySelector('form');
const divInfo = document.querySelector('#weatherInfo');
const divError = document.querySelector('#error');
const icon= document.querySelector('#weatherIcon')



weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
   
   const location = document.querySelector('input').value;
    divError.textContent = 'En cours...'
    fetch(`/getweather/${location}`)
    .then((response) => {
      response.json().then((data) => {
         divInfo.textContent=data.weatherInfo
         icon.innerHTML=`<img src=${data.weatherIcon}>` 
      })
    })
    .catch(error => {divInfo.textContent=error});
});