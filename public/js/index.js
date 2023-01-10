// firebase
const db = firebase.firestore();

const div = document.querySelector('#results');
const searchField = document.querySelector('.search');

// ALL FUNCTIONS --------------------------------------------------------
const fetchData = function(collection, arr) {
    db.collection(collection).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            arr.push(data);
        });
    })
};

const displayResult = function(obj) {
    if (obj.Collection === 'eier') {
        let html = `
        <div id="${obj.id}">
            <h3>${obj.Navn}</h3>
            <p>${obj.Kontaktspråk}</p>
            <p>${obj.Telefonnummer}</p>
            <p>${obj.Personnummer}</p>
        </div>
        `;

        div.innerHTML += html;
    } else if (obj.Collection === 'flokk') {
        let html = `
        <div id="${obj.id}">
            <h3>${obj.Flokknavn}</h3>
            <p>${obj.Eier}</p>
            <p>${obj.Serieinndeling}</p>
            <p>${obj.Buemerke}</p>
        </div>
        `;

        div.innerHTML += html;
    } else if (obj.Collection === 'reinsdyr') {
        let html = `
        <div id="${obj.id}">
            <h3>${obj.Navn}</h3>
            <p>${obj.Fødselsdato}</p>
            <p>${obj.Flokk_tilhørighet}</p>
            <p>${obj.Serienummer}</p>
        </div>
        `;

        div.innerHTML += html;
    }
}

// RUN -------------------------------------------------------------------------------------

// storing data
let dataEier = [];
let dataFlokk = [];
let dataReinsdyr = [];
let dataBeiteområde = [];

// fetch data
fetchData('eier', dataEier);
fetchData('flokk', dataFlokk);
fetchData('reinsdyr', dataReinsdyr);
fetchData('beiteområde', dataBeiteområde);
const dataArrays = [dataEier, dataFlokk, dataReinsdyr, dataBeiteområde];

// search field
searchField.addEventListener('input', () => {
    console.log('------------------------------ NEW SEARCH -------------------------------------');
    // fetch input
    const searchInput = searchField.value.trim().toLowerCase();

    // clear tidligere elementer
    div.innerHTML = '';

    // hide nomatch items
    dataArrays.forEach(section => {
        section.forEach(obj => {
            let allProps = '';
            for (const key in obj) { // hvert property navn som variabelen key
                if (key === 'id') {
                    console.log('Ignore id for search');
                } else {
                    allProps += obj[key]; // legg til verdien av hvert property til allProps
                }
            }

            if (allProps.toLowerCase().includes(searchInput)) { // sjekk om allProps matcher med søkefeltet
                displayResult(obj);
                console.log(searchInput, obj);
            }
        });
    });
});