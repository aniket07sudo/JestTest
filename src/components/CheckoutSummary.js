import React from 'react';
import Burger from './Burger';
import Button from './Button';

const checkoutSummary = (props) => {
    return (
        <div>
            <h1>We Hopes It Tastes Well</h1>
            <div style={{width:'300px', margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button type="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
            <Button type="Success" clicked={props.checkoutContinue}>Continue</Button>
        </div>
    )
}

export default checkoutSummary;