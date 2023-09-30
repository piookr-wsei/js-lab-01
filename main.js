// notatnik z zajęć
window.addEventListener("DOMContentLoaded", (event) => {
const liczba1 = document.querySelector('#liczba1')
const btnPrzelicz = document.querySelector('#przelicz')
const btnCreate = document.querySelector("#createComponentButton")
const wynikiPojemnik = document.querySelector('#wyniki')

const inputContainer = document.querySelector("#inputContainer")

const arrayOfInputs = [createInputComponent(0), createInputComponent(1), createInputComponent(1),]

for (input of arrayOfInputs){
    inputContainer.appendChild(input)
}

if(btnPrzelicz){

    btnPrzelicz.addEventListener('click', () => {
        wynikiPojemnik.innerHTML = liczba1.value
        console.log(liczba1.value)
    })
}

if(btnCreate){
    btnCreate.addEventListener("click", () => {
        inputContainer.appendChild(createInputComponent(arrayOfInputs.length))
        //console.log(createInputComponent(0))
    })
}

function createInputComponent(index){
    let template = `
        <input type="text" id="liczba${index}" />
        <button id="przelicz">Przelicz</button>`

    let component = document.createElement('div')

    component.innerHTML = template

    return component
}
})