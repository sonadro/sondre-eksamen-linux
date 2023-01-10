// firebase
const db = firebase.firestore();

const div = document.querySelector('#results');
const searchField = document.querySelector('.search');

// ALL FUNCTIONS --------------------------------------------------------
const displayResult = function(obj) {
    if (obj.Collection === 'eier') {
        let html = `
        <div id="${obj.id}">
            <h3>${obj.Navn} - ${obj.Collection}</h3>
            <p>${obj.Kontaktspråk}</p>
            <p>${obj.Telefonnummer}</p>
            <p>${obj.Personnummer}</p>
        </div>
        `;

        div.innerHTML += html;
    } else if (obj.Collection === 'flokk') {
        let html = `
        <div id="${obj.id}">
            <h3>${obj.Flokknavn} - ${obj.Collection}</h3>
            <p>${obj.Eier}</p>
            <p>${obj.Serieinndeling}</p>
            <p>${obj.Buemerke}</p>
        </div>
        `;

        div.innerHTML += html;
    } else if (obj.Collection === 'reinsdyr') {
        let html = `
        <div id="${obj.id}">
            <h3>${obj.Navn} - ${obj.Collection}</h3>
            <p>${obj.Fødselsdato}</p>
            <p>${obj.Flokk_tilhørighet}</p>
            <p>${obj.Serienummer}</p>
        </div>
        `;

        div.innerHTML += html;
    }
}

const displayObjs = function(objs) {
    for (i = 0; i < objs.length; i++) {
        const obj = objs[i];
        displayResult(obj);
    }
}

const searchProperties = function(rawInput, array) {
    let newArr = array.slice(0); // function should be non-destructive
    const inputs = rawInput.trim().toLowerCase().split(' ');

    newArr.forEach(obj => {
        obj.Relevance = 0;
        let allProps = '';
        for (prop in obj) {
            if (prop !== 'id') {
                allProps += obj[prop];
            }
        }

        inputs.forEach(input => {
            if (allProps.toLowerCase().includes(input)) {
                obj.Relevance += input.length;
            }
        });
    });

    newArr.sort((a, b) => b.Relevance - a.Relevance);
    let lastLoop = false;
    let i = 0;
    newArr.forEach(obj => {
        if (lastLoop) {
            return;
        } else {
            if (obj.Relevance === 0) {
                newArr.length = i;
            }
            i++;
        }
    });

    displayObjs(newArr);
}

// RUN -------------------------------------------------------------------------------------

// fetch data
let dataArr = [];
// fetch('eiere', dataArr);
// fetch('flokk', dataArr);
// fetch('reinsdyr', dataArr);
db.collection('eier').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        dataArr.push(data);
    });
    db.collection('flokk').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            dataArr.push(data);
        });
        db.collection('reinsdyr').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                dataArr.push(data);
            });
        });
    });
});

// search field
searchField.addEventListener('input', () => {
    // clear tidligere elementer
    div.innerHTML = '';

    // search through array
    searchProperties(searchField.value, dataArr);
});