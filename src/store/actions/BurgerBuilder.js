import * as actionTypes from './actions';
import axios from '../../axios-orders';
export const addIngredient = (name) => {
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}
export const removeIngredients = (name) => {
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}
export const setIngredients = (ingredients) => {
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const initIngredients = () => {
    console.log("init")
    return dispatch => {
        axios.get("/ingredients.json")
        .then(response => {
            dispatch(setIngredients(response.data));
        } )
        .catch(err => {
            dispatch(fetchIngredientsFailed());
        });
    }
}
export const fetchIngredientsFailed = () => {
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED,
        error:true
    }
}