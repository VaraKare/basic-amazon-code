import {currencyFormat} from '../scripts/utility/money.js';
describe('test suite : format currency', ()=>{
    it('converts cents into dollars', ()=>{
        expect(currencyFormat(2095)).toEqual('20.95');
    });

    it('works with 0', ()=>{
        expect(currencyFormat(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent', ()=>{
        expect(currencyFormat(2000.5)).toEqual('20.01');
    });
})