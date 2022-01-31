import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem';

const navigationItems = (props) => (
    
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {props.isAuth ? <NavigationItem link="/logout">Log out</NavigationItem> :  <NavigationItem link="/auth">Auth</NavigationItem>}
    </ul>
);

export default navigationItems;