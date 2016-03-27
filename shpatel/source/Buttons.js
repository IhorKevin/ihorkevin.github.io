import React from 'react';

class Buttons extends React.Component {
    render() {
        return (
            <div className="buttons page__wrap">
                <button className="buttons__item">Профком</button>
                <button className="buttons__item buttons__item_negative">Жесті хочу</button>
                <button className="buttons__item buttons__item_secondary">Мені пощастить</button>
            </div>
        )
    }
}

export default Buttons;
