document.getElementById('select-continent').addEventListener('change', (event) => {
    if (event.target.value === "all") {
        window.location.href = "../index.html"; 
    } else {
        window.location.href = `../html/${event.target.value}.html`; 
    }
});


let countries = [];


function searchCountries() {
    searchBar.addEventListener('input', e => {
        const value = e.target.value; 
        countries.forEach(country => {

            //const capitalCountry = country.capital.toString(); 
            const isVisible = country.name.includes(value) || country.region.includes(value) //|| capitalCountry.includes(value); 
            country.element.classList.toggle('hide', !isVisible);
        }); 
    }); 
}


function getCountriesApi(continent) { 
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {

        const countriesContinent = data.filter(country => country.region === continent); 
        orderCountries(countriesContinent); 

        countries = countriesContinent.map(country => {
            return displayCountry(country);
        }); 
        // countries = countriesContinent.map(country => displayCountry(country)); 
    });
}

function displayCountry(country) {
    const countriesCardTemplate = document.querySelector('[data-countries-template]'); 
    const countriesCardContainer = document.querySelector('[data-countries-cards-container]');

    const card = countriesCardTemplate.content.cloneNode(true).children[0]; 
    const flag = card.querySelector('.flag'); 
    const nameCountry = card.querySelector('.country'); 
    const population = card.querySelector('.population'); 
    const region = card.querySelector('.region'); 
    const capital = card.querySelector('.capital'); 

    const populationNumber = country.population;
    const decimalPopulationNumber = new Intl.NumberFormat('de-DE', { style: 'decimal', maximumFractionDigits: 0 }).format(populationNumber);

    flag.style.backgroundImage = `url('${country.flags.svg}')`; 
    flag.style.backgroundSize = 'cover';
    flag.style.backgroundRepeat = 'no-repeat';
    nameCountry.textContent = country.name.common;
    population.textContent = 'Population : ' + decimalPopulationNumber; 
    region.textContent = 'Region : ' + country.region; 
    capital.textContent = 'Capital : ' + country.capital; 

    card.dataset.country = country.name.common; 

    card.addEventListener('click', () => {
        window.location.href = '../html/detail.html'; 
        localStorage.setItem('nameCountry', country.name.common); 
    }); 

    countriesCardContainer.append(card); 
    return {
        name: country.name.common, 
        region: country.region, 
        capital: country.capital, 
        element: card
    }
}


function displayAndSearchCountries(continent) {
    getCountriesApi(continent); 
    searchCountries(); 
}


function orderCountries(order) {
    order.sort(function compare(a, b) {
        if (a.name.common < b.name.common)
           return -1;
        if (a.name.common > b.name.common)
           return 1;
        return 0;
    });
}
