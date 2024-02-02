window.addEventListener("DOMContentLoaded", (event) => {
    const btnPrzelicz = document.querySelector('#przelicz')
    const btnCreate = document.querySelector("#createComponentButton")
    const wynikiPojemnik = document.querySelector('#wyniki')
    const inputContainer = document.querySelector("#inputContainer")

    let arrayOfInputs = [createInputComponent(0), createInputComponent(1), createInputComponent(2)]

    arrayOfInputs.forEach(input => {
        inputContainer.appendChild(input)
    })

    const calculateSum = () => {
        let sum = 0
        arrayOfInputs.forEach((input, index) => {
            const inputElement = document.querySelector(`#liczba${index}`)
            if(inputElement) {
                sum += parseFloat(inputElement.value) || 0
            }
        })
        wynikiPojemnik.innerHTML = `Suma: ${sum}`
    }

    if(btnPrzelicz){
        btnPrzelicz.addEventListener('click', calculateSum)
    }

    if(btnCreate){
        btnCreate.addEventListener("click", () => {
            const newIndex = arrayOfInputs.length
            const newInputComponent = createInputComponent(newIndex)
            arrayOfInputs.push(newInputComponent)
            inputContainer.appendChild(newInputComponent)
        })
    }

    function createInputComponent(index){
        let component = document.createElement('div')
        component.setAttribute('id', `inputComponent${index}`)
        let template = `
            <input type="text" id="liczba${index}" />
            <button class="remove" id="remove${index}">Usuń</button>`

        component.innerHTML = template

        component.querySelector(`#remove${index}`).addEventListener('click', () => {
            document.querySelector(`#inputComponent${index}`).remove()
            arrayOfInputs = arrayOfInputs.filter((_, i) => i !== index)
            calculateSum()
        })

        return component
    }
})