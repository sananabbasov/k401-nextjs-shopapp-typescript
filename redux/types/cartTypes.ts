import { type } from "os";


interface Data{
    id:number;
    last_name: string;
    first_name: string;
    wish_lists: any[]
}

export interface  Cart {
    data: Data;
    loading: boolean;
    error: null | string;
}

export enum CartActionTypes {
    FETCH_CART = "FETCH_CART",
    FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS",
    FETCH_CART_ERROR = "FETCH_CART_ERROR",
    FETCH_CART_LOADING = "FETCH_CART_LOADING"
}

interface FetchCartAction {
    type: CartActionTypes.FETCH_CART
}

interface FetchCartSuccessAction {
    type: CartActionTypes.FETCH_CART_SUCCESS;
    payload: any[];
}

interface FetchCartErrorAction {
    type: CartActionTypes.FETCH_CART_ERROR;
    payload: string;
}

interface FetchCartLoadingAction {
    type: CartActionTypes.FETCH_CART_LOADING;
    payload: boolean
}


export type CartAction =
    FetchCartAction
    | FetchCartSuccessAction
    | FetchCartErrorAction
    | FetchCartLoadingAction



