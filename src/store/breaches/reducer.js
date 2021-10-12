import { createReducer } from "@reduxjs/toolkit";
import {
  FETCH_BREACHES_REQUEST,
  FETCH_BREACHES_SUCCESS,
  FETCH_BREACHES_FAILED,
} from "./actions";

const initState = {
  breaches: [],
  errors: null,
  loading: false,
};

const breachesReducer = createReducer(initState, {
  [FETCH_BREACHES_REQUEST]: (state) => {
    state.loading = true;
    state.breaches = [];
  },
  [FETCH_BREACHES_SUCCESS]: (state, { payload }) => {
    state.loading = false;
    state.breaches = payload;
  },
  [FETCH_BREACHES_FAILED]: (state, { payload }) => {
    state.loading = false;
    state.errors = payload;
  },
});

export default breachesReducer;
