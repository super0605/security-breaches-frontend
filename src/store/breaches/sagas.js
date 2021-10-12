import { takeLatest, call, put } from "redux-saga/effects";
import {
  FETCH_BREACHES_REQUEST,
  fetchBreachesSuccessAction,
  fetchBreachesFailedAction,
} from "./actions";
import { breachesApi } from "../../services";

function* fetchBreachesSaga({ payload }) {
  try {
    const response = yield call(breachesApi.fetchBreaches, payload);
    yield put(fetchBreachesSuccessAction(response));
  } catch (error) {
    yield put(fetchBreachesFailedAction(error));
  }
}

export const breachesSagas = [
  takeLatest(FETCH_BREACHES_REQUEST, fetchBreachesSaga),
];
