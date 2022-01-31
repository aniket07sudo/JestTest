import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredients';

const burger = (props) => {
    // console.log(Object.keys(props.));
    let tranIngredients = Object.keys(props.ingredients).map((ingKey) => {
        return [...Array(props.ingredients[ingKey])].map((_,i) => {
            return <BurgerIngredient key={ingKey + i} type={ingKey}/>
        })
    }).reduce((arr,el) => {
        return arr.concat(el)
    },[]);
    if(tranIngredients.length === 0) {
        tranIngredients = <p>Start Adding Ingredients</p>;
    }
    return(
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {tranIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;