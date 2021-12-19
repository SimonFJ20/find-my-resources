
const searchTextInput = document.getElementById('search-text');
const searchSubmitButton = document.getElementById('search-submit');

const seachEvent = (text) => {
    if (!text) return;
    

}

const setSearchEvent = () => {
    searchSubmitButton.addEventListener('click', () => seachEvent(searchTextInput.value));
}

const main = () => {
    
    setSearchEvent();
}

main();
