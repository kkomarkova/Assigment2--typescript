import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"
import { IBid } from "./Ibid";

 //url for the rest webservice at Azure
 let bidWebUrl: string = "https://restcoinservice20201030093309.azurewebsites.net/api/bids/";
//Get all bids eventlistener
 let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("bidsContent");
 let GetAllBidsButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");

 GetAllBidsButton.addEventListener('click',showAllBids);
 //Get one bids by id eventlistener
 let getOneBidButton: HTMLButtonElement =<HTMLButtonElement> document.getElementById("getOneButton");
getOneBidButton.addEventListener("click", addoneBid)
//Bidlist
let getOneBidList : HTMLOListElement = <HTMLOListElement> document.getElementById("getoneBidlist");
//Add Bid
let AddBidButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
AddBidButton.addEventListener('click',addBid);
//Delete car button eventlistener
let deleteBidButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton");
deleteBidButton.addEventListener('click',deleteBid);

function deleteBid():void{

    //finds the id for the car to delete
    let delBidIdElement: HTMLInputElement = <HTMLInputElement> document.getElementById("deleteBidId");
    let myBidId : number = +delBidIdElement.value;
    
    let deleteContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("deletecontent");

    
    //http delete request with one parameter(params) id that is set to myCarId
    axios.delete("https://restcoinservice20201030093309.azurewebsites.net/api/bids/"+myBidId
        )
        .then((response :  AxiosResponse): void => {
                console.log("Bid is deleted ");
                console.log("Statuscode is :" + response.status);
                deleteContentElement.innerHTML = "bid is deleted";
        })
        .catch(
            (error:AxiosError) : void => {                          
                console.log(error);
                deleteContentElement.innerHTML = "Error: the bid is NOT deleted, look at the console";
            });

            //https://www.typescriptlang.org/docs/handbook/functions.html
            //se arrow functions 
}

function addBid():void{
    let addItemelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addItem");
    let addNameelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addName");
    let addPriceelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addPrice");

    let myItem : string = addItemelement.value;
    let myName: string = addNameelement.value;
    let myPrice : number = +addPriceelement.value;  

    axios.post<IBid>("https://restcoinservice20201030093309.azurewebsites.net/api/bids/",
                    {item:myItem,name:myName,price:myPrice})
                    .then(function (response :  AxiosResponse): void
                    {
                        console.log("Statuscode is :" + response.status);
                    })
                    .catch(
                        function (error:AxiosError) : void{                          
                            console.log(error);
                        }
                    )
                    

}

  //Function Get 1 Bid by id 
  function addoneBid():void{
    let addoneBidelement : HTMLInputElement = <HTMLInputElement> document.getElementById("getOne")
    let myBidId : number = +addoneBidelement.value;
    console.log("In the addoneBid function");
    console.log("My card ID" + myBidId)
    axios.get(bidWebUrl +"/" + myBidId)
    .then (function(response:AxiosResponse<IBid>):void{
        console.log(response);
        console.log("Status is : " + response.status);
        let myBid: IBid = response.data;
        let newNode: HTMLLIElement = AddLiElement ("Name" + myBid.name );
        getOneBidList.appendChild(newNode);
    })
} 
 //Function showallBids - GET all bids from list
 function showAllBids():void{

    axios.get<IBid[]>("https://restcoinservice20201030093309.azurewebsites.net/api/bids/")
    .then(function (response: AxiosResponse<IBid[]>) : void
    {
        console.log("are in then");
        console.log(response);

        // let result: string = "<ol>" 
        //remove all the li elements one by one
    while (ContentElement.firstChild) {
        ContentElement.removeChild(ContentElement.lastChild);
    }
   


        response.data.forEach((bid: IBid) => {
            let newNode:HTMLLIElement = AddLiElement(bid.id + " " +bid.item+ " "+bid.name + "" + bid.bid);
            ContentElement.appendChild(newNode);
        
        });
         
    })
    .catch(
        function (error:AxiosError) : void{
            console.log("Error in the typescript code");
            console.log(error);

        }
    )
    
    console.log("At the end in the showAllBids function");

 }
 function AddLiElement(text:string):HTMLLIElement {
    let newLi:HTMLLIElement = document.createElement('li');
    let newTextNode:Text = document.createTextNode(text)
    newLi.appendChild(newTextNode);
            // list.appendChild(newLi);
    return newLi;
 }

