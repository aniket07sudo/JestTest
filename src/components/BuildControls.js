import React from 'react';
import BuildControl from './buildControl';
import './BuildControls.css';
let controls = [
    { label:'Salad' , type:'salad'},
    { label:'Bacon' , type:'bacon'},
    { label:'Cheese', type:'cheese'},
    { label:'Meat', type:'meat'}
];
const buildControls = (props) => (
    <div className="BuildControls">
        <p>Current Price : {props.price.toFixed(2)}</p>
        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} 
            label={ctrl.label} 
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)} 
            disable={props.disabled[ctrl.type]} />
        ))}
        <button className="OrderButton" disabled={!props.purchasable} onClick={props.ordered}>{props.isAuth ? 'Order Now' : 'Signup to Checkout'}</button>
    </div>
);

export default buildControls;