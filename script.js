
// --- example 3
let button = document.getElementById("btn");
let $inputBox = document.getElementById("inputBox");
let $container = document.getElementById("taskContainer");

$inputBox.focus();

$inputBox.addEventListener("keypress",(event)=>{
    if(event.code === 0){
       event.target.value;
    };
});

function oneClick(){
   // toggle (on/off)
  this.classList.toggle("complected");

  let taskId = this.id.toString();

  for(let i = 0; i < taskArr.length; i++){
    let taskObj =  taskArr[i]

    if(taskObj.id.toString() === taskId){
       taskObj.isCompleted = !taskObj.isCompleted;
    }
  }
  setValues();
};

function handleRemove(){

   let taskId = this.id.toString();

   for(let i = 0; i < taskArr.length; i++){
      let taskObj = taskArr[i]

      if(taskObj.id.toString() === taskId){
         taskArr.splice(i,1);
      }
   }
   setValues();

   this.remove();
};

let taskArr = [];

//function consoleArr(){
  // console.log(taskArr);
//};

function setValues(){
   localStorage.setItem("values",JSON.stringify(taskArr));
};

function getValues(){
   let values = localStorage.getItem("values")
   if(!values){
      return;
   }
   values = JSON.parse(values);

   for(index in values){
      let taskObj = values[index];
      createTask(taskObj.value,taskObj.isCompleted,taskObj.id);
      taskArr.push(values[index]);
   }
};


getValues();

function createTask(add,isCompleted,taskId){
   
   let newElement = document.createElement("div");
   newElement.innerText = add;
    
   newElement.setAttribute("id",taskId);

   if(isCompleted)newElement.setAttribute("class","task complected");
   else newElement.setAttribute("class","task");

   newElement.addEventListener("click",oneClick);
   
   newElement.addEventListener("dblclick",handleRemove);

   $container.append(newElement);
};

button.addEventListener("click",()=>{

     let add = $inputBox.value;
     if(add.length === 0) return alert( "plz enter value");

     let inputlength = add.length;
     let count = 0;

     for(let i = 0; i < inputlength; i++){
       if(add[i] === " "){
          count++ ;
       }
     }
     if(inputlength === count){
        return alert( "enter value word");
     }
     
     let taskId = Math.random().toString();

     let taskObj = {};
     taskObj.value = add;
     taskObj.isCompleted = false;
     taskObj.id = taskId;
     
     taskArr.push(taskObj);

     setValues();

     createTask(add,false,taskId);

     $inputBox.value = "";
     $inputBox.focus();

   } );

   //---- debugging bugs

   // 1. state management
   // 2. Empty value -> alert to the user 
   // 3. check for the spaces... -> regex
   // 4. deleting the element should reflect in localstorage
   // 5. same name values..
   // 6. same id repeated

   //---- cookie

   let cookie = document.querySelector(".cookie");
   let button2 = document.querySelector(".btn2");


   button2.addEventListener("click",()=>{
      cookie.classList.remove("active");
      localStorage.setItem("Accpet",true);
   })

   setTimeout(()=>{
      if(!localStorage.getItem("Accpet")){
         cookie.classList.add("active")
      }
   },2000)



   