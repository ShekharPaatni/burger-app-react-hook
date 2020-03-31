import reducer from './auth';
import * as actionTypes from '../action/actionTypes';

describe('with reducer', () => {
    it("should be an initialState", () => {
        expect(reducer(undefined, {})).toEqual({
            token : null,
            userId : null,
            error : null,
            loading : false,
            authRedirectUri : '/'
        })
    })
})