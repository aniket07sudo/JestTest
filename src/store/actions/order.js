import * as actionTypes from './actions';
import axios from '../../axios-orders';



export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token,orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        })
        .catch(err => {
            dispatch(purchaseBurgerFail(err))
        })
    }
}

export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderStart = () => {
    return {
        type:actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderFail = (err) => {
    return {
        type:actionTypes.FETCH_ORDER_FAIL,
        error:err
    }
}
export const fetchOrderSuccess = (order) => {
    return {
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:order
    }
}

export const fetchOrder = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json?auth=' + token)
        .then(res => {
            const fetchOrders = [];
            for (let key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id:key
                });
            }
            dispatch(fetchOrderSuccess(fetchOrders));

        })
        .catch(err => {
            dispatch(fetchOrderFail(err));
        })
    }
}