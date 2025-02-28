import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,

} from "../reducers/admin";


function* watchAdminLogin() {
    yield takeLatest(ADMIN_LOGIN_REQUEST, adminLogin);
}

function adminLoginAPI(data) {
    return axios.post("/admin/login", data);
}

function* adminLogin(action) {
    try {
        const result = yield call(adminLoginAPI, action.data);
        console.log(result.status)
        if (result.status === 200) {
            window.location.href = '/'
        }

        yield put({
            type: ADMIN_LOGIN_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ADMIN_LOGIN_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* adminSaga() {
    yield all([fork(watchAdminLogin)]);
}