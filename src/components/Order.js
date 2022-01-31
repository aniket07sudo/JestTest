import React from 'react';
import './Order.css';

const Order = (props) => {

    const ingredients = [];
    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        })
    }
   const ingredientOutput = ingredients.map(ig => {
   return <span>{ig.name} ({ig.amount}) </span>
   })

    return ( 
    <div className="Order">
    {ingredientOutput}
    </div>
)
   
}

export default Order;