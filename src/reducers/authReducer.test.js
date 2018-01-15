import reducer from './authReducer';
import * as Constants from '../Constants'


describe('auth reducer', ()=>{
    it('should return initial state', ()=>{
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath:"/"
        })
    })

    it('should store token on login', ()=>{
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath:"/"
        }, {
            type:Constants.AUTH_SUCCESS,
            idToken:'some-token',
            userId:'some-id'
        })).toEqual({
            token: 'some-token',
            userId: 'some-id',
            error: null,
            loading: false,
            authRedirectPath:"/"
        })
    })
})