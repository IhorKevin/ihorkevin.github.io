(function() {

    var game = document.querySelector('.game');
    var enemy = document.querySelector('.enemy');
    var menu = document.querySelector('.menu');
    var gameScore;
    var startButton = document.querySelector('.menu__start');
    var levelButton = document.querySelector('.game__next-level');
    var canFire = false, fault = false;
    var level, range, score, levelBonus;

    var dispScore = document.querySelector('.stats__score');
    var dispRange = document.querySelector('.stats__range');
    var dispTimer = document.querySelector('.stats__timer');
    var dispLevel = document.querySelector('.game__level');
    var gameStatus = document.querySelector('.game__status');

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
        clearAnimation();
        enemyMove();
    }

    function enemyMove() {
        enemy.style.left = ''; // clear holding after fault
        if(enemy.classList.contains('enemy_move')) {
            enemy.classList.remove('enemy_move');
        }
        setTimeout(function() {
            enemy.classList.add('enemy_move');
            enemyWalk();
            sfxIntro.play();
        }, 50);
    }

    function startDuel() {
        sfxIntro.pause();
        sfxIntro.currentTime = 0;
        enemyStay();
        sfxWait.play();
        setTimeout(function() {
            if(!fault) { //if player clicked before 1000ms timeout then do nothing
                gameStatus.textContent = 'FIRE!';
                gameStatus.classList.add('game__status_show');
                canFire = true;
                enemyReady();
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
            enemy.removeEventListener('mousedown', playerHit);
            canFire = false;
            score = score + 1000 + 1000 * (range/1000 - levelBonus) * level;
            sfxShot.play();
            enemyDown();
            setTimeout(enemyDead, 1800);
            gameStatus.textContent = 'You won!';
            dispScore.textContent = 'Score: ' + score;
            setTimeout(function() {
                sfxWin.play();
            }, 1000);
            setTimeout(function() {
                levelButton.addEventListener('click', nextLevel);
                levelButton.classList.add('game__next-level_show');
            }, 2000);
        }
        else {
            fault = true;
            enemy.removeEventListener('mousedown', playerHit);
            enemy.removeEventListener('transitionend', startDuel);
            sfxIntro.pause();
            sfxIntro.currentTime = 0;
            sfxShot.play();
            var left = enemy.offsetLeft;
            enemy.classList.remove('enemy_move');
            enemy.style.left = left + 'px'; // hold Gunman on current position
            clearAnimation();
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
            enemyHit(); // Sprite animation
            gameStatus.textContent = 'Gunman won!';
            setTimeout(function() {
                sfxDeath.play();
            }, 1000);
            setTimeout(gameOver, 2000);
        }
    }

    function nextLevel() {
        if(level < 5) {
            clearAnimation();
            gameStatus.textContent = '';
            gameStatus.classList.remove('game__status_show');
            enemy.classList.remove('enemy_' + level);
            levelButton.removeEventListener('click', nextLevel);
            levelButton.classList.remove('game__next-level_show');
            level++;
            range -= 140;
            enemy.classList.add('enemy_' + level);
            showStats();
            enemy.addEventListener('mousedown', playerHit);
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
        levelButton.removeEventListener('click', nextLevel);
        levelButton.classList.remove('game__next-level_show');
        clearAnimation();
    }

    // sprite animation

    function enemyWalk() { // legs animation
        clearAnimation();
        enemy.classList.add('enemy_' + level + '-walk');
    }
    function enemyStay() {
        clearAnimation();
        enemy.classList.add('enemy_' + level + '-stay');
    }

    function enemyReady() {
        clearAnimation();
        enemy.classList.add('enemy_' + level + '-ready');
    }

    function enemyHit() {
        clearAnimation();
        enemy.classList.add('enemy_' + level + '-hit');
        game.classList.add('game_hit');
    }
    function enemyDown() {
        clearAnimation();
        enemy.classList.add('enemy_' + level + '-down');
    }
    function enemyDead() {
        clearAnimation();
        enemy.classList.add('enemy_' + level + '-dead');
    }
    function clearAnimation() {
        for(var j = 1; j < 6; j++) {
            enemy.classList.remove('enemy_' + j + '-walk');
            enemy.classList.remove('enemy_' + j + '-stay');
            enemy.classList.remove('enemy_' + j + '-ready');
            enemy.classList.remove('enemy_' + j + '-hit');
            enemy.classList.remove('enemy_' + j + '-down');
            enemy.classList.remove('enemy_' + j + '-dead');
            game.classList.remove('game_hit');
        }
    }

    // Original sounds

    var sfxDeath = new Audio('sfx/death.m4a');
    var sfxFire = new Audio('sfx/fire.m4a');
    var sfxFault = new Audio('sfx/foul.m4a');
    var sfxIntro = new Audio('sfx/intro.m4a');
    var sfxShot = new Audio('sfx/shot.m4a');
    var sfxWait = new Audio('sfx/wait.m4a');
    var sfxWin = new Audio('sfx/win.m4a');

     //Custom Sounds

    //var sfxDeath = new Audio('sfx/death.mp3');
    //var sfxFire = new Audio('sfx/fire.m4a');
    //var sfxFault = new Audio('sfx/foul.mp3');
    //var sfxIntro = new Audio('sfx/intro.mp3');
    //var sfxShot = new Audio('sfx/shot.mp3');
    //var sfxWait = new Audio('sfx/wait.mp3');
    //var sfxWin = new Audio('sfx/win.mp3');

})();