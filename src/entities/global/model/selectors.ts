import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "src/app/store";

export const errorCodeSelector = createSelector(
    ({ global: { errorCode } }: AppState) => errorCode,
    (errorCode) => errorCode,
)
