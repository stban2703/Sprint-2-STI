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

    let personProps = Object.keys(personA);
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;
    let cosineSimilarity = 0;

    for (let i = 1; i < personProps.length; i++) {
        let prop = personProps[i];
        dotProduct += (personA[prop] * personB[prop]);
        magnitudeA += Math.pow(personA[prop], 2);
        magnitudeB += Math.pow(personB[prop], 2);
    }
    
    cosineSimilarity = dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
    result = cosineSimilarity.toFixed(2);
    renderResult();
}

function renderResult() {
    resultFIeld.value = result;
    //resultFIeld.value = (result * 100).toString() + "%";
}