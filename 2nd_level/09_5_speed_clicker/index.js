console.clear();

let clickCt = 0;
let clickCountOutput = document.theForm.click_count_output;
let timerOutput = document.theForm.timer_output;
let alarmTime = new Date();
alarmTime.setSeconds(alarmTime.getSeconds() + 30);

document.addEventListener('click', e => {
    e.preventDefault();
    if(Math.round((alarmTime.getTime() - Date.now()) / 1000) > 0) clickCt++;
    // else clickCt = `Time is up, you clicked ${clickCt} times!!!`;
    clickCountOutput.value = clickCt;
})

// stops doubleclicks from selecting words on screen
document.addEventListener('mousedown', function (e) { e.preventDefault(); }, false);

var x = setInterval(() => {
    const timeLeft = Math.round((alarmTime.getTime() - Date.now()) / 1000)
    timerOutput.value = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(x);
        timerOutput.value = 'Time is up, 0';
    }
}, 1000)


