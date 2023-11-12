import {combineReducers} from "redux";
import { cartReducer } from "./cartReducers";

export const rootReducer = combineReducers({
    // Add your reducers here.
    cart: cartReducer
})

export type RootState = ReturnType<typeof rootReducer>