let start = document.querySelector(".control-buttons");
let finish = document.querySelector(".finish");
let block = document.getElementsByClassName(".block");

document.querySelector(".control-buttons span").onclick = function (){

   let yourName = prompt("What Is your Name?");
    
    if(yourName == null || yourName == "" ){
    document.querySelector(".name span").innerHTML = "Unknown"
    
        
    }else{
    document.querySelector(".name span").innerHTML = yourName
    

    }
   
    start.style.display = "none"
    timer(300);
   
}





finish.onclick = function(){
    finish.style.display = "none";
    start.style.display = "block";
    showData()
}


function timer(duratio){

   let countdown = setInterval(function ()  {
        
    duratio -= 1

    if( duration > -1 && duratio < 1) {
        console.log(duratio)

        clearInterval(countdown);
        document.querySelector(".finish").style.display = "block";
    }

    let  minutes, seconds;
    minutes = parseInt(duratio / 60);
    seconds = parseInt(duratio % 60);

    minutes = minutes < 10 ? `0${minutes}` : `${minutes}` ;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}` ;

    document.querySelector('.timer span').innerHTML = `${minutes}:${seconds}`;
   
        }, 1000);

    }
    
  
let duration = 1000;

let blockContaier = document.querySelector(".game-blocks");


let blocks = Array.from(blockContaier.children);


let orderRage = Array.from(Array(blocks.length).keys());



shuffle(orderRage);


blocks.forEach((block, index) => {
    block.style.order = orderRage[index];
    block.addEventListener("click", function (){
        flipBlock(block);
    })
})

function flipBlock(block){
block.classList.add("is-flipped")

let allflipblock = blocks.filter(flipBlock => flipBlock.classList.contains('is-flipped'));

if(allflipblock.length === 2){
    stopClicking();
checkMatchedBlocks(allflipblock[0], allflipblock[1])

}
}

function stopClicking(){
    blockContaier.classList.add('no-clicking');

    setTimeout(() => {

        // Remove Class No Clicking After The Duration
        blockContaier.classList.remove('no-clicking');
    
      }, duration);
}
let tries = document.querySelector('.tries span');
   let score = document.querySelector('.score span');

function checkMatchedBlocks(one, two){
   


    if(one.dataset.languages ===  two.dataset.languages){

        one.classList.remove("is-flipped");
        two.classList.remove("is-flipped");

        one.classList.add("has-match");
        two.classList.add("has-match");
        score.innerHTML =  parseInt(score.innerHTML) +1

    }else{

        // document.querySelector('.tries span').innerHTML =
      tries.innerHTML =  parseInt(tries.innerHTML) +1

      setTimeout(() => {

        one.classList.remove('is-flipped');
        two.classList.remove('is-flipped');
  
      }, duration);
  
    }
    showData(score, tries)
}

function shuffle(array){
    let current = array.length,
      temp,
      random;

  while (current > 0) {

    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;

  }
  return array;
}

function showData(score, tries){
    
        let  table;
        table =`
        <tr>
                           <td>${document.querySelector(".name span").innerHTML}</td>
                           <td>${score.innerHTML}</td>
                           <td>${tries.innerHTML}</td>
                       <td><span id="span">Delete</span></td> 
                       </tr>
        
        
        `
        document.getElementById("tbody").innerHTML = table;
       
    
 
}


document.addEventListener('click', (e) => {
    
if(e.target.id === 'span'){
    
    document.getElementById("tbody").innerHTML = "";
    tries.innerHTML = "0";
    score.innerHTML = "0";
    start.style.display = "block";
    

}
})