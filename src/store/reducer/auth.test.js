import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from './auth';
import * as actionTypes from '../actions/actions'

configure({adapter:new Adapter()}) // Connecting Enzyme

describe('<BurgerBuilder />', () => {

    it("checking initial state of redux", () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        })
    });

    // it('should store token on login', () => {
    //     expect(reducer({
    //             token:null,
    //             userId:null,
    //             error:null,
    //             loading:false,
    //             authRedirect:'/'
    //     }, {
    //         type:actionTypes.AUTH_SUCCESS,
    //         token: 'something',
    //         userId:'123'
    //     }

    //     )).toEqual({
    //             token:'something',
    //             userId:'123',
    //             error:null,
    //             loading:false,
    //             authRedirect:'/'
    //     })
    // })
})