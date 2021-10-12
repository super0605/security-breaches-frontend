import { createAction } from "@reduxjs/toolkit";

export const FETCH_BREACHES_REQUEST = "[BREACHES]/FETCH_REQUEST";
export const FETCH_BREACHES_SUCCESS = "[BREACHES]/FETCH_SUCCESS";
export const FETCH_BREACHES_FAILED = "[BREACHES]/FETCH_FAILED";

export const fetchBreachesReqAction = createAction(FETCH_BREACHES_REQUEST);
export const fetchBreachesSuccessAction = createAction(FETCH_BREACHES_SUCCESS);
export const fetchBreachesFailedAction = createAction(FETCH_BREACHES_FAILED);
