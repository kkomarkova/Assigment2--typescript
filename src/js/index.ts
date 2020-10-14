let inputText = <HTMLInputElement> document.getElementById("input");
let selectedOption = <HTMLSelectElement> document.getElementById("letters");
let result:HTMLElement = document.getElementById("table");
let itemId:number = 1;

document.getElementById("doit").addEventListener("click", AddElement);

function AddElement(){
    //Creates the table row element
    let trElement:HTMLTableRowElement = document.createElement("tr");
    result.appendChild(trElement);

    //Adds the number to the row
    let itemNumber:HTMLTableHeaderCellElement = document.createElement("th");
    itemNumber.innerHTML = itemId.toString();
    trElement.appendChild(itemNumber);

    //Adds the text to the row
    let itemText:HTMLTableHeaderCellElement = document.createElement("th");
    let text:string;
    if(selectedOption.value == "upper"){
        text = inputText.value.toUpperCase();
    }
    else{
        text = inputText.value.toLowerCase();
    }
    itemText.innerHTML = text;
    trElement.appendChild(itemText);

    //Adds a class based on the number of the item
    if(itemId%2 == 0){
        trElement.className = "even";
    }
    else{
        trElement.className = "uneven";
    }

    //Gives each created element its own unique id
    trElement.id = itemId.toString();
    itemNumber.id = "number" + itemId.toString();
    itemText.id = "text" + itemId.toString();

    itemId++;
}