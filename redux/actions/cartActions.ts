import { Dispatch } from "react"
import { CartAction, CartActionTypes } from "../types/cartTypes"

export const getUserCart = (token: string | undefined) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    return async (dispatch: Dispatch<CartAction>) => {
        try {
            dispatch({ type: CartActionTypes.FETCH_CART })
            const response: any[] = await fetch(`https://localhost:7037/api/v1/WishList/items`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(x => x.json()).then(x=>x.data)
            dispatch({ type: CartActionTypes.FETCH_CART_SUCCESS, payload: response })
        } catch (e) {
            dispatch({
                type: CartActionTypes.FETCH_CART_ERROR,
                payload: 'Error oldu'
            })
        }
    }
}