import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    USER_AUTH_REQUEST,
    USER_AUTH_SUCCESS,
    USER_AUTH_FAILURE,
} from "../reducers/user";




function* watchUserAuth() {
    yield takeLatest(USER_AUTH_REQUEST, userAuth);
}

function userAuthAPI() {

    return axios.get("/user/auth");
}

function* userAuth() {
    try {
        const result = yield call(userAuthAPI);
        yield put({
            type: USER_AUTH_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_AUTH_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* adminSaga() {
    yield all([fork(watchUserAuth)]);
}