
const previousOperationText = document.getElementById("previous-operation")
const currentOperationText = document.getElementById("currents-operation")
const button = document.querySelectorAll("#buttons-container button")




const calculadora = {
    addDigit(digit){
        //checagem se o digito é igual a "." e se ja inclui o ".", não pode digitar dois pontos e não pode digitar mais "."" se ja existir ponto"
        if(digit === "." && currentOperationText.innerText.includes(".")){
            return
        }//checagem de que se o current estiver vazio e for digitado "." é adicionado um 0 na frente, ou seja fica 0.
        if(digit === "." && currentOperationText.innerText === ""){
            currentOperationText.innerText = 0 + digit
        }else{
            //caso seja digitado outro valor  
            currentOperation = digit
            this.update()
        }
    },

    getOperation(operation) {
        //checagem de valor existente
        if(currentOperationText.innerText === "" && operation !=="C"){
            //checagem do previous ser diferente de vazio é quando acontece a troca de operador
            if(previousOperationText.innerText !== ""){
                this.calculatorOperation(operation)
            }
            return
        }

        this.getOperationCase(operation)
    },
    getOperationCase(operation){
        let operationValue;
        let currentValue = +currentOperationText.innerText
        let previusValue =  +previousOperationText.innerText.split(" ")[0]
    
        this.caseOperation(operationValue,operation,currentValue,previusValue)
    },
    caseOperation(operationValue,operation,currentValue,previusValue){
        switch (operation) {
            case "+":
                operationValue = currentValue + previusValue
                this.update(operationValue,operation,currentValue,previusValue)
             break;
            case "-":
                operationValue = currentValue - previusValue
                this.update(operationValue,operation,currentValue,previusValue)
             break;
            case "/":
                if(currentValue === 0){
                    alert("divisão por 0 não é possivel")
                    return
                }
                operationValue = currentValue / previusValue
                this.update(operationValue,operation,currentValue,previusValue)
             break;
             case "DEL":
                 this.currentDel()
              break;
            case "*":
                operationValue = currentValue * previusValue
                this.update(operationValue,operation,currentValue,previusValue)
             break;
            case "=":
                this.resultsOperation()
             break;
            case "CE":
                this.cleananAll()
             break;
            case "C":
                this.cleanCurrent()
             break;
            default:
            return
        }

    },
    update(operationValue = null,operation = null,currentValue = null ,previusValue = null){

        if(operationValue === null){
            currentOperationText.innerText += currentOperation
        }else{
        if(previusValue === 0){
            operationValue = currentValue
        }
        previousOperationText.innerText = `${operationValue} ${operation}`
        currentOperationText.innerText = ""


    }

    },
    calculatorOperation(operation){
        const mathTerm = ["+","-","/","*"]

        if(!mathTerm.includes(operation)){
            return
        }
        previousOperationText.innerText = previousOperationText.innerText.slice(0,-1) + operation;


    },
    currentDel(){
        currentOperationText.innerText = currentOperationText.innerText.slice(0, -1)

    },
    resultsOperation(){
        const operati = previousOperationText.innerText.split(" ")[1]
            
        this.getOperation(operati)
    },
    cleananAll(){
        previousOperationText.innerText = " "
        currentOperationText.innerText = " "
    },
    cleanCurrent(){
        currentOperationText.innerText = " "
    }



}


const variaveis = ({previousOperationText,currentOperationText}) =>{
    const getVar = Object.create(calculadora)

    getVar.previousOperationText = previousOperationText
    getVar.currentOperationText = currentOperationText

    getVar.currentOperation = ""


    return getVar

}


const targets = variaveis({previousOperationText,currentOperationText})



button.forEach((btn) =>{
    const keyButton = btn.innerText

    document.addEventListener("keydown", (e) =>{
        if(keyButton.includes(e.key)){
            if(+keyButton >= 0 || keyButton === "."){
                targets.addDigit(keyButton)
            }else{
                targets.getOperation(keyButton)
            }
        }

    })
    btn.addEventListener("click", (e)=>{
        const value = e.target.innerText
        if(+value >= 0 || value === "."){
            targets.addDigit(value)
        }else{
            targets.getOperation(value)
        }
    })


})
