class Teatralna {
    constructor(options) {
        this.entrances = options.entrances;
        this.elevator = options.elevator;
        if (options.forbiddenCrosses)
            this.forbiddenCrosses = options.forbiddenCrosses;
        if (options.existingCrosswalk)
            this.existingCrosswalk = options.existingCrosswalk;
    }
    getEnteredUnder() {
        const sum = this.entrances.reduce((previous, current) => previous + current, 0);
        if (sum && sum > 0)
            return sum;
        else {
            console.warn('No one entered');
            return 0;
        }
    }
    getUndergroundCrosses() {
        return this.getEnteredUnder() - this.elevator;
    }
    getPercentage() {
        return this.getUndergroundCrosses() / this.getEnteredUnder() * 100;
    }
    getTotalCrosses() {
        return this.getUndergroundCrosses() + (this.forbiddenCrosses || 0);
    }
}
const teatralnaForm = document.querySelector('#teatralna');
const summaryTable = document.querySelector('#summary-table');
const entrances = [...Array.from(teatralnaForm.querySelectorAll('[name*=entrance_]'))];
const elevator = teatralnaForm.querySelector('[name=elevator]');
const potentialCrosswalk = teatralnaForm.querySelector('[name=potential_crosswalk]');
const totalPercentageHolder = document.querySelector('#total-percentage');
const totalCrossesHolder = document.querySelector('#total-crosses');
teatralnaForm.addEventListener('submit', event => event.preventDefault());
const inputs = [elevator, potentialCrosswalk, ...entrances];
const getInputValues = () => {
    return {
        entrances: entrances.map(entrance => Number(entrance.value)),
        elevator: Number(elevator.value),
        forbiddenCrosses: Number(potentialCrosswalk.value)
    };
};
const renderSummary = (model) => {
    summaryTable.querySelector('td.total-entered').innerHTML = model.getEnteredUnder().toString();
    summaryTable.querySelector('td.underground-crosses').innerHTML = model.getUndergroundCrosses().toString();
    summaryTable.querySelector('td.ground-crosses').innerHTML = potentialCrosswalk.value;
    totalPercentageHolder.innerText = model.getPercentage().toFixed(2);
    totalCrossesHolder.innerText = model.getTotalCrosses().toString();
};
// initial calculation
if (teatralnaForm.checkValidity() && entrances.some(input => Number(input.value) > 0)) {
    // calculate result if form is valid and at least one person entered
    renderSummary(new Teatralna(getInputValues()));
}
inputs.forEach(input => {
    input.addEventListener('input', event => {
        // check form validity
        if (!teatralnaForm.checkValidity()) {
            return;
        }
        // create instance
        const teatralna = new Teatralna(getInputValues());
        // render results
        renderSummary(teatralna);
    });
});
