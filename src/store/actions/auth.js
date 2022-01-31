import * as actionTypes from './actions';
import axios from 'axios';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token,id) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        tokenId:token,
        userId:id
    }
}

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime*1000);
    }
}

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYldp9IHGsx0KWUelRgkiWF_O_SYS0S2M';
        if(isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYldp9IHGsx0KWUelRgkiWF_O_SYS0S2M';
        }
        axios.post(url,authData)
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token',res.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',res.data.localId);
           dispatch(authSuccess(res.data.idToken,res.data.localId));
           dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const authRedirect = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT,
        path:path
    }
}
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(authLogout());
        } else {
            const expirationdate = new Date(localStorage.getItem('expirationDate'));
            if(expirationdate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationdate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}