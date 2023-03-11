import {math} from '../lib.test/math';


describe('Testing math library', () => {

it('Should multiply two numbers correcly', () => {
    const response = math.mul(8,2);
    expect(response).toBe(16);
});

it('should subtract two numbers correcly', () => {
    const response = math.sub(5,1);
    expect(response).toBe(4);
});

it('should sum two numbers correcl ', () => {
    const response = math.sum(5,5);
    expect(response).toBe(10);
});

});