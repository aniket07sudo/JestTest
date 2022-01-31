import * as actionTypes from '../actions/actions';
import { updateObject } from '../utility';

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirect:'/'
}

const authStart = (state,action) => {
    return updateObject(state,{loading:true,error:null});
};

const authSuccess = (state,action) => {
    return updateObject(state,{loading:false,error:null,token:action.tokenId,userId:action.userId});
};
const authFail = (state,action) => {
    return updateObject(state,{loading:false,error:action.error});
};

const authlogout = (state,action) => {
    return updateObject(state,{
        token:null,
        userId:null
 })
}

const setAuthRedirect = (state,action) => {
    return updateObject(state,{authRedirect:action.path})
}

const reducer = (state = initialState,action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return authStart(state,action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state,action);
        case actionTypes.AUTH_FAIL:
            return authFail(state,action);
        case actionTypes.AUTH_LOGOUT:
            return authlogout(state,action);
        case actionTypes.SET_AUTH_REDIRECT:
            return setAuthRedirect(state,action);
        default:
            return state;
    }
}

export default reducer;