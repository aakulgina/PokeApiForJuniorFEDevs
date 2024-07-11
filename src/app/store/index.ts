import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { middleware as apiMiddleware } from "src/shared/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware),
})

setupListeners(store.dispatch)

export type AppState = ReturnType<typeof reducer>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => ThunkDispatch<AppState, void, Action> = () => useDispatch<AppDispatch>()
