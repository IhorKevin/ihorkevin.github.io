const scissors = document.querySelector('.scissors');
const halves = scissors.querySelectorAll('.scissors__half');
const backHalf = halves[0];
const frontHalf = halves[1];
const closedClass = 'scissors_closed';

const onCut = event => {
    if(event.type === 'keydown' && event.code !== 'Space') return;
    event.preventDefault();
    scissors.classList.add(closedClass);
    backHalf.style.animationName = 'none';
    frontHalf.style.animationName = 'none';
    throwBubble();
};

const onRelease = event => {
    if(event.type === 'keydown' && event.code !== 'Space') return;
    scissors.classList.remove(closedClass);
    backHalf.style.transform = 'rotateZ(15deg)';
    frontHalf.style.transform = 'rotateZ(-15deg)';
};

scissors.addEventListener('mousedown', onCut);
window.addEventListener('keydown', onCut);

scissors.addEventListener('mouseup', onRelease);
window.addEventListener('keyup', onRelease);

backHalf.addEventListener('transitionend', () => udpateAnimationHalf(backHalf, 'back-side'));
frontHalf.addEventListener('transitionend', () => udpateAnimationHalf(frontHalf, 'front-side'));

function udpateAnimationHalf(elem, animationName) {
    if(elem.style.transform) {
        console.log('TRANS END', elem.style.transform);
        elem.style.transform = '';
        elem.style.animationName = animationName;
    }
}

function throwBubble() {
    const div = document.createElement('div');
    div.classList.add('scissors__cut');
    div.textContent = 'Чік!';
    const destroy = () => {
        div.remove();
        div.removeEventListener('animationend', destroy);
    };
    div.addEventListener('animationend', destroy);
    scissors.appendChild(div);
}
