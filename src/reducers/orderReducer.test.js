import reducer from './orderReducer';
import * as Constants from '../Constants'

describe('order reducer', ()=>{
    it('should return initial state', ()=>{
        expect(reducer(undefined, {})).toEqual({
            orders:[],
            loading:false,
            purchased:false
        });
    });
});
