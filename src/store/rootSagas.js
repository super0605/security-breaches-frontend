import { all } from "redux-saga/effects";
import { breachesSagas } from "./breaches/sagas";

export default function* rootSaga() {
  yield all([...breachesSagas]);
}
