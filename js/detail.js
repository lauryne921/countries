const localCountry = localStorage.getItem('nameCountry'); 

const countryName = document.getElementById('country-name'); 
const natineName = document.querySelector('.native-name'); 
const population = document.querySelector('.population'); 
const region = document.querySelector('.region'); 
const subRegion = document.querySelector('.sub-region'); 
const capital = document.querySelector('.capital'); 
const topLevelDomain = document.querySelector('.top-level-domain'); 
const currencies = document.querySelector('.currencies'); 
const languages = document.querySelector('.languages'); 
const borderCountries = document.querySelector('.border-countries');
const flag = document.querySelector('.flag-container'); 



fetch('https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data => {


    const countrySelected = data.find(country => country.name.common === localCountry); 
    console.log(countrySelected);

    flag.style.backgroundImage = `url('${countrySelected.flags.svg}')`;
    flag.style.backgroundSize = '100%';
    flag.style.backgroundRepeat = 'no-repeat';

    displayContent(countrySelected);
});

const languagesValues = []; 


function displayContent(countrySelected) {
    const populationNumber = countrySelected.population;
    const decimalPopulationNumber = new Intl.NumberFormat('de-DE', { style: 'decimal', maximumFractionDigits: 0 }).format(populationNumber);

    countryName.innerText = countrySelected.name.common;  
    population.innerText = 'Population : ' + decimalPopulationNumber; 
    region.innerText = 'Region : ' + countrySelected.region; 
    subRegion.innerText = 'Sub Region : ' + countrySelected.subregion; 
    topLevelDomain.innerText = 'Top Level Domain : ' + countrySelected.tld.shift();
    capital.innerText = 'Capital : ' + countrySelected.capital;  


    const countryLanguages = countrySelected.languages; 
    Object.values(countryLanguages).join(" / "); 
    languages.innerText = "Languages : " + Object.values(countryLanguages).join(" / ");

    for (const [key, value] of Object.entries(countrySelected.currencies)) {
        currencies.innerText = `Currencies : ${value.name}`; 
    }

    for (const [key, value] of Object.entries(countrySelected.name.nativeName)) {
        natineName.innerText = `Native Name : ${value.common}`;
    }
    borderCountries.innerHTML = 'Border Countries : ' + countrySelected.borders.join(" / ");
    
}



document.querySelector('button').addEventListener('click', () => {
    //window.location.href = '../';
    window.history.back(); 
});
