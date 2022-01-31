import * as actionTypes from '../actions/actions';

const initialState = {
    ingredients:null,
    totalPrice:4,
    error:false
}

const INGREDIENT_PRICES = {
    salad:100,
    bacon:200,
    cheese:150,
    meat:170
}

const reducer = (state = initialState,action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
            case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients:action.ingredients,
                totalPrice:0,
                error:false
            };
            case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredients:action.ingredients,
                error:true
            };
        default:
            return state;
    }
}

export default reducer;