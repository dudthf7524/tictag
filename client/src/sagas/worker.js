import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    WORKER_LOGIN_REQUEST,
    WORKER_LOGIN_SUCCESS,
    WORKER_LOGIN_FAILURE,

} from "../reducers/worker";


function* watchWorkerLogin() {
    yield takeLatest(WORKER_LOGIN_REQUEST, workerLogin);
}

function workerLoginAPI(data) {
    return axios.post("/worker/login", data);
}

function* workerLogin(action) {
    try {
        const result = yield call(workerLoginAPI, action.data);
        if(result.status === 200){
            window.location.href = '/';
        }

        yield put({
            type: WORKER_LOGIN_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: WORKER_LOGIN_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* workerSaga() {
    yield all([fork(watchWorkerLogin)]);
}