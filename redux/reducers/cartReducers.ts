import { Cart, CartAction, CartActionTypes } from "../types/cartTypes"

const initialState: Cart = {
    data: [],
    error: null,
    loading: false
}

export const cartReducer = (state = initialState, action: CartAction): Cart => {
    switch (action.type) {
        case CartActionTypes.FETCH_CART:
            return {...state, loading: true}
        case CartActionTypes.FETCH_CART_SUCCESS:
            return {...state, loading: false, data: action.payload}
        case CartActionTypes.FETCH_CART_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}