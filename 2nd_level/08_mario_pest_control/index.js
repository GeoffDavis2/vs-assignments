const theForm = document.theForm;

theForm.addEventListener('submit', e => {
    e.preventDefault();

    goombasTotCoins = theForm.goombasCaught.value * 5;
    bobombsTotCoins = theForm.bobombsCaught.value * 7;
    cheepcheepsTotCoins = theForm.cheepcheepsCaught.value * 11;
    grandTotCoins = goombasTotCoins + bobombsTotCoins + cheepcheepsTotCoins;

    theForm.goombasTotCoins.value = goombasTotCoins;
    theForm.bobombsTotCoins.value = bobombsTotCoins;
    theForm.cheepcheepsTotCoins.value = cheepcheepsTotCoins;
    theForm.grandTotCoins.value = grandTotCoins;
});