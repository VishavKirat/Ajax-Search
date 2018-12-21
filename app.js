

const searchInput = document.querySelector('.search')
const suggestion = document.querySelector('.suggestions')
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const h = new Headers();
h.append('Accept','application/json')
const  req = new Request(endpoint,{
  method: 'Get',
  headers : h,
  mode : 'cors'
});

const cities = [];

fetch(req)
          .then(response => (response.ok)?response.json():"Errorrrrrr")
          .then(jsonData => {
            cities.push(...jsonData)})

function findMatch(wordToMatch,cities){
 return  cities.filter(place =>{
    let regex = new RegExp(wordToMatch,'gi')
    return place.city.match(regex) || place.state.match(regex);
  })
}

function displayMatch(){
  let matchedArray =  findMatch(this.value,cities);

   let innerHTML = matchedArray.map(place =>{
     let regex = new RegExp(this.value,'gi');
     let cityName = place.city.replace(regex,`<span class='hl'>${this.value}</span>`)
     return `
     <li>
      <span class='name'>${cityName},${place.state}</span>
      <span class='population'>${place.population}</span>
     </li>
     `
   }).join('')
   suggestion.innerHTML = innerHTML;

}

searchInput.addEventListener('keyup',displayMatch);
