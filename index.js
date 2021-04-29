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
    calculateSimilarity();
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

function calculateSimilarity() {
    let personA = data.find(elem => {
        return elem.Nombre == personAselect.value;
    });

    let personB = data.find(elem => {
        return elem.Nombre == personBselect.value;
    });

    let dotProduct =
        (personA.a * personB.a) +
        (personA.b * personB.b) +
        (personA.c * personB.c) +
        (personA.d * personB.d) +
        (personA.e * personB.e);

    let magnitudeA =
        Math.sqrt(
            Math.pow(personA.a, 2) +
            Math.pow(personA.b, 2) +
            Math.pow(personA.c, 2) +
            Math.pow(personA.d, 2) +
            Math.pow(personA.e, 2)
        );

    let magnitudeB =
        Math.sqrt(
            Math.pow(personB.a, 2) +
            Math.pow(personB.b, 2) +
            Math.pow(personB.c, 2) +
            Math.pow(personB.d, 2) +
            Math.pow(personB.e, 2)
        );

    let cosineSimilarity = dotProduct / (magnitudeA * magnitudeB);
    result = cosineSimilarity.toFixed(3);
    renderResult();
}

function renderResult() {
    resultFIeld.value = result;
}