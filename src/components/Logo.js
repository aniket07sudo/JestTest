import React from 'react';
import Logoicon from './Logo.png';
import './Logo.css';

const logo = (props) => (
    <div className="Logo">
        <img src={Logoicon} alt="MyBurger" />
    </div>
);

export default logo;