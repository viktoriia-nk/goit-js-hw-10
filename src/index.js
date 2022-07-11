import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';


const inputEl = document.querySelector('#search-box')
const listEl = document.querySelector('.country-list')
const divInfoEl = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 300;

const onInputSearch=(event)=>{
    event.preventDefault()

    const countrySearch = event.target.value.trim()
    // console.log('countrySearch :>> ', countrySearch);

    if (countrySearch === ""){
        removeMarkUpList()
        removeMarkUpCountryCard()
        return
    }


    fetchCountries(countrySearch)
    .then(countries=>{
        // console.log('countries :>> ', countries);
        if (countries.length >10){
            removeMarkUpList()
            removeMarkUpCountryCard()
            Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.')
            return
        }
        if (countries.length>=2 && countries.length <=10){
            murkUp(countries)
            removeMarkUpCountryCard()
            return
        }
        if (countries.length === 1){
            removeMarkUpList()
            murkUpCountryCard(countries)
            return
        }
    })
    .catch(error =>{
        Notiflix.Notify.warning('Oops, there is no country with that name')
        removeMarkUpList()
        removeMarkUpCountryCard()
        return
    })
}

const murkUp =(contries)=>{
    const li = contries.map(el=>{
        return `<li class="item">
        <img class="flag-img" src="${el.flags.svg}" alt="country-flag">
       <p class="name">${el.name}</p>
        </li>`
    }).join('')
    listEl.innerHTML = li
    }


    

const murkUpCountryCard = (countries)=>{
    const country = countries.map(el=>{
       const lang = el.languages.map(el=> {
            return el.name
        });
        return `<ul class="country-list">
        <li class="country-item">
        <img class="country-flag" src="${el.flags.svg}" alt="country-flag">
        <h1 class="country-name">${el.name}</h1>
        </li>
        <li class="country-item">
        <h2 class="data">Capital: ${el.capital}</h2>
        </li>
        <li class="country-item">
        <h2 class="data">Population: ${el.population}</h2>
        </li>
        <li class="country-item">
        <h2 class="data">Languages: ${lang}</h2>
        </li>
        </ul>`
    }).join('')
    divInfoEl.innerHTML = country
}
    

    const removeMarkUpList =()=>{
        listEl.innerHTML = ""
    }
    const removeMarkUpCountryCard =()=>{
        divInfoEl.innerHTML = ""
    }

inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY))
