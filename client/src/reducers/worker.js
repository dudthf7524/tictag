import produce from "../util/produce";

export const initialState = {
    worker_login_Loading: false, // 로그인 시도중
    worker_login_done: false,
    worker_login_error: null,

    worker: null,
};



export const WORKER_LOGIN_REQUEST = "WORKER_LOGIN_REQUEST";
export const WORKER_LOGIN_SUCCESS = "WORKER_LOGIN_SUCCESS";
export const WORKER_LOGIN_FAILURE = "WORKER_LOGIN_FAILURE";


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case WORKER_LOGIN_REQUEST:
                draft.worker_login_Loading = true;
                draft.worker_login_error = null;
                draft.worker_login_done = false;
                break;
            case WORKER_LOGIN_SUCCESS:
                draft.worker_login_Loading = false;
                draft.worker = action.data;
                draft.worker_login_done = true;
                break;
            case WORKER_LOGIN_FAILURE:
                draft.worker_login_Loading = false;
                draft.worker_login_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;