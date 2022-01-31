import React from 'react';
import Aux from '../hoc/Auxiliary';
import Button from './Button';

const OrderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map((igKey => {
    return <li>{igKey} : {props.ingredients[igKey]}</li>
    }))

    return(
        <Aux>
            <h3>Your Order :</h3>
            <p>A Delecious Burger with Following Ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price : <strong>{props.price}</strong></p>
            <p>Continue To Checkout ?</p>
            <Button type="Danger" clicked={props.cancel} >CANCEL</Button>
            <Button type="Success" clicked={props.continueModal}>CONTINUE</Button>
        </Aux>
    )
}

export default OrderSummary;