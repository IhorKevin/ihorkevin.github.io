import React from 'react';
import Logo from './Logo';
import Question from './Question';

class Header extends React.Component {
    render() {
        return (
            <header className="page__header">
                <div className="page__wrap">
                    <Logo />
                    <Question />
                </div>
            </header>
        )
    }
}

export default Header;
