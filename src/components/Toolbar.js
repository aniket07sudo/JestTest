import React from 'react';
import './Toolbar.css';
import Logo from './Logo';
import NavigationItems from './NavigationItems';

const toolbar = (props) => (
    <header className="Toolbar">
        <div>MENU</div>
        <Logo />
        <nav>
            <NavigationItems isAuth={props.isauthenticated} />
        </nav>
    </header>
);

export default toolbar;