import produce from "../util/produce";

export const initialState = {
   

    user_auth_Loading: false,
    user_auth_done: false,
    user_auth_error: null,

    user:null,

};

export const USER_AUTH_REQUEST = "USER_AUTH_REQUEST";
export const USER_AUTH_SUCCESS = "USER_AUTH_SUCCESS";
export const USER_AUTH_FAILURE = "USER_AUTH_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case USER_AUTH_REQUEST:
                draft.user_auth_Loading = true;
                draft.user_auth_error = null;
                draft.user_auth_done = false;
                break;
            case USER_AUTH_SUCCESS:
                draft.user_auth_Loading = false;
                draft.user = action.data;
                draft.user_auth_done = true;
                break;
            case USER_AUTH_FAILURE:
                draft.user_auth_Loading = false;
                draft.user_auth_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;