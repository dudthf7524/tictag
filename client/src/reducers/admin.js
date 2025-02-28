import produce from "../util/produce";

export const initialState = {
    admin_login_Loading: false, // 로그인 시도중
    admin_login_done: false,
    admin_login_error: null,

    admin: null,
};



export const ADMIN_LOGIN_REQUEST = "ADMIN_LOGIN_REQUEST";
export const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS";
export const ADMIN_LOGIN_FAILURE = "ADMIN_LOGIN_FAILURE";


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADMIN_LOGIN_REQUEST:
                draft.admin_login_Loading = true;
                draft.admin_login_error = null;
                draft.admin_login_done = false;
                break;
            case ADMIN_LOGIN_SUCCESS:
                draft.admin_login_Loading = false;
                draft.admin = action.data;
                draft.admin_login_done = true;
                break;
            case ADMIN_LOGIN_FAILURE:
                draft.admin_login_Loading = false;
                draft.admin_login_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;