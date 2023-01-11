const db = firebase.firestore();

// upload products to database
const getFile = async (resource) => {
    const response = await fetch(resource);

    if (response.status !== 200) {
        throw new Error('Cannot fetch the data, error code', response.status);
    }

    const data = await response.json();

    return data;
}

getFile('/uploadEiere.json')
    .then(objects => {
        objects.forEach(obj => {
            db.collection('eier').add(obj).then(() => {
                console.log('object added', obj);
            })
        });
    })
    .catch(err => console.error(err));
// //