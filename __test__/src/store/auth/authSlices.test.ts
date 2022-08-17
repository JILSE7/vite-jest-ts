import { authSlice } from "../../../../src/store/auth";
import { authFixtures } from "../../fixtures";

describe('test in authSlice ', () => {

    test('should return initialState and called "auth"', () => {
        expect(authSlice.name).toEqual('auth');
        expect(authSlice.getInitialState()).toEqual(authFixtures.initialState);
    });
});