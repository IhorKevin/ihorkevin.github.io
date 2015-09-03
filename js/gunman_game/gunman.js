var enemy = document.querySelector('.enemy');
var menu = document.querySelector('.menu');
var gameScore;
var startButton = document.querySelector('.menu__start');
var canFire = false, fault = false;
var level, range, score, levelBonus;

var dispScore = document.querySelector('.stats__score');
var dispRange = document.querySelector('.stats__range');
var dispTimer = document.querySelector('.stats__timer');
var dispLevel = document.querySelector('.game__level');
var gameStatus = document.querySelector('.game__status');

var sfxShot = document.querySelector('.sfx__shot');
var sfxFire = document.querySelector('.sfx__fire');
var sfxWait = document.querySelector('.sfx__wait');
var sfxFault = document.querySelector('.sfx__foul');
var sfxDeath = document.querySelector('.sfx__death');
var sfxWin = document.querySelector('.sfx__win');
var sfxIntro = document.querySelector('.sfx__intro');


startButton.addEventListener('click', startGame);
enemy.addEventListener('transitionend', startDuel); //after end of css transition play wait sfx
enemy.addEventListener('hit', gunmanHit);

function startGame() {
    gameStatus.classList.remove('game__status_show');
    enemy.classList.remove('enemy_' + level);
    level = 1;
    range = 900;
    score = 0;
    menu.classList.add('menu_hide');
    enemy.addEventListener('mousedown', playerHit);
    enemy.classList.add('enemy');
    showStats();
    enemyMove();
}

function enemyMove() {
    enemy.style.left = ''; // clear holding after fault
    if(enemy.classList.contains('enemy_move')) {
        enemy.classList.remove('enemy_move');
    }
    setTimeout(function() {
        enemy.classList.add('enemy_move');
        sfxIntro.play();
    }, 50);
}

function startDuel() {
    sfxIntro.pause();
    sfxIntro.currentTime = 0;
    sfxWait.play();
    setTimeout(function() {
        if(!fault) { //if player clicked before 1000ms timeout then do nothing
            gameStatus.textContent = 'FIRE!';
            gameStatus.classList.add('game__status_show');
            canFire = true;
            sfxFire.play();
            timeCounter(new Date().getTime());
            setTimeout(gunmanHit, range);
        }
    }, 1000);
}

function timeCounter(time) {
    var currTime;
    function timeCompare() {
        currTime = new Date().getTime();
        if(canFire) { // stop time when player or gunman hits
            levelBonus = ((currTime - time)/1000).toFixed(2);
            dispTimer.textContent = '' + levelBonus + ' You';
            setTimeout(timeCompare, 10);
        }
    }
    timeCompare();
}

function playerHit() {
    if(canFire) {
        canFire = false;
        score = score + 1000 + 1000 * (range/1000 - levelBonus) * level;
        sfxShot.play();
        gameStatus.textContent = 'You won!';
        dispScore.textContent = 'Score: ' + score;
        setTimeout(function() {
            sfxWin.play();
        }, 1000);
        setTimeout(nextLevel, 2000);
    }
    else {
        fault = true;
        enemy.removeEventListener('mousedown', playerHit);
        enemy.removeEventListener('transitionend', startDuel); //after end of css transition allow click on enemy
        sfxIntro.pause();
        sfxIntro.currentTime = 0;
        sfxShot.play();
        var left = enemy.offsetLeft;
        enemy.classList.remove('enemy_move');
        enemy.style.left = left + 'px'; // hold Gunman on current position
        gameStatus.textContent = 'Fault!';
        gameStatus.classList.add('game__status_show');
        score = score - 1000;
        if(score < 0) score = 0;
        setTimeout(function() {
            sfxFault.play();
        }, 1000);
        setTimeout(restartLevel, 2000);
    }
}

var hit = new CustomEvent('hit');

function gunmanHit() {
    if(canFire) {
        enemy.removeEventListener('mousedown', playerHit);
        canFire = false;
        sfxShot.play();
        enemy.dispatchEvent(hit); // Gunman is shooting
        gameStatus.textContent = 'Gunman won!';
        setTimeout(function() {
            sfxDeath.play();
        }, 1000);
        setTimeout(gameOver, 1000);
    }
}

function nextLevel() {
    if(level < 5) {
        gameStatus.textContent = '';
        gameStatus.classList.remove('game__status_show');
        enemy.classList.remove('enemy_' + level);
        level++;
        range -= 140;
        enemy.classList.add('enemy_' + level);
        showStats();
        enemyMove();
    } else gameOver();
}

function restartLevel() {
    fault = false;
    gameStatus.classList.remove('game__status_show');
    enemy.addEventListener('mousedown', playerHit);
    enemy.addEventListener('transitionend', startDuel);
    showStats();
    enemyMove();
}

function showStats() {
    dispLevel.textContent = 'Level ' + level;
    dispScore.textContent = 'Score: ' + score;
    dispRange.textContent = 'Gunman ' + (range/1000).toFixed(2);
    dispTimer.textContent = '0.00 You';
}

function gameOver() {
    var menuInner = menu.querySelector('.menu__inner');
    if(gameScore) gameScore.remove(); // clean previous gameScore
    gameScore = document.createElement('p');
    gameScore.textContent = 'Your score: ' + score;
    menuInner.insertBefore(gameScore, menuInner.firstChild); // insert score above start button
    menu.classList.remove('menu_hide');
}