const countriesCardTemplate = document.querySelector('[data-countries-template]'); 
const countriesCardContainer = document.querySelector('[data-countries-cards-container]'); 


searchBar.addEventListener('input', e => {
    const value = e.target.value; 
    countries.forEach(country => {
        const isVisible = country.name.includes(value) || country.region.includes(value); 
        country.element.classList.toggle('hide', !isVisible);
    }); 
}); 



fetch('https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data => {

    orderCountries(data);
    
    countries = data.map(country => {
        return displayCountry(country) 
    }); 
});
