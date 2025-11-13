
const state = {
view:{
    timer:document.querySelector("#time-left"),
    score:document.querySelector("#score"),
    enemy:document.querySelector(".enemy"),
    square:document.querySelectorAll(".square"),
    vidas:document.querySelector("#lifes")

},

values:{
    timerId : null,
    countDownTimerId: setInterval(countDown, 1000),
    timervelocity :1000,
    hitPosition : 0,
    result : 0,
    currentTime : 20,
    currentLife : 3,
}
};

function countDown (){
    state.values.currentTime--;
    state.view.timer.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        clearInterval(state.values.countDownTimerId)
        clearInterval(state.values.timerId)

        alert(`Tempo acabou moral, você fez ${state.values.result} pontos`)
        countLifes()
    }


}


function playSound (){
    let audio = new Audio ("./src/audios/hit.m4a");
    audio.volume =0.2;
    audio.play()}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare,state.values.timervelocity)
}


function randomSquare (){
    state.view.square.forEach((square)=>{
        square.classList.remove("enemy")
        
    });
    let randomNumber = Math.floor(Math.random() * 9);

    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;


}



function addListenerHitBox(){
    state.view.square.forEach((square)=>{
        square.addEventListener("mousedown",() => {
            if(square.id === state.values.hitPosition){
              
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition =null;
            playSound()
            }

        }
        )

    });


}
function playSound (){
    let audio = new Audio ("./src/audios/hit.m4a");
    audio.volume =0.2;
    audio.play()
}
function init (){
    
    moveEnemy();
    addListenerHitBox();
  

}
function countLifes (){
    if(state.values.result <= 10){
        state.values.currentLife--;
        state.view.vidas.textContent = state.values.currentLife;
        clearInterval(state.values.currentLife);
        clearInterval(state.values.result)
    }


}

init()