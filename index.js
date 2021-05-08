const comparisonForm = document.querySelector(".comparisonForm");
const personAselect = comparisonForm.personA;
const personBselect = comparisonForm.personB;
const resultFIeld = comparisonForm.result;

let url = './data/baseDeDatosOficial2.csv';
let result = 0;
let data = [];
let nameList = [];

Papa.parse(url, {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function (results) {
        console.log(results.data);
        data = results.data;
        data.forEach(elem => {
            nameList.push(elem.Nombre);
        });
        renderNameOptions();
    }
});

comparisonForm.addEventListener('submit', event => {
    event.preventDefault();
    let personA = getPersonFromList(personAselect.value);
    let personB = getPersonFromList(personBselect.value);
    let dotProduct = getDotProduct(personA, personB);
    let magnitudeA = getMagnitude(personA);
    let magnitudeB = getMagnitude(personB);
    let cosineSimilarity = getCosineSimilarity(dotProduct, magnitudeA, magnitudeB);
    renderResult(cosineSimilarity);
})

function renderNameOptions() {
    nameList.forEach(elem => {
        const optionsElemA = document.createElement("option");
        const optionsElemB = document.createElement("option");
        optionsElemA.innerText = elem;
        optionsElemB.innerText = elem;
        optionsElemA.value = elem;
        optionsElemB.value = elem;
        personAselect.appendChild(optionsElemA);
        personBselect.appendChild(optionsElemB);
    });
}

function getPersonFromList(value) {
    let person = data.find(elem => {
        return elem.Nombre == value;
    });
    return person;
}

function getDotProduct(elemA, elemB) {
    let dotProduct = 0;
    let elemProps = Object.keys(elemA)
    for (let i = 1; i < elemProps.length; i++) {
        let prop = elemProps[i];
        dotProduct += (elemA[prop] * elemB[prop]);
    }
    return dotProduct;
}

function getMagnitude(elem) {
    let magnitude = 0;
    let elemProps = Object.keys(elem);
    for (let i = 1; i < elemProps.length; i++) {
        let prop = elemProps[i];
        magnitude += Math.pow(elem[prop], 2);
    }
    return Math.sqrt(magnitude);
}

function getCosineSimilarity(dotProduct, magnitudeA, magnitudeB) {
    let cosineSimilarity = dotProduct / (magnitudeA * magnitudeB);
    return cosineSimilarity;
}

function renderResult(result) {
    resultFIeld.value = (result.toFixed(2) * 100).toString() + "%";
}