// firebase
const db = firebase.firestore();

const div = document.querySelector('.reinsdyr');

const fetchData = function(collection, arr) {
    db.collection(collection).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            arr.push(data);
        });
    })
};

let testArr = [];

fetchData('reinsdyr', testArr);
console.log(testArr);