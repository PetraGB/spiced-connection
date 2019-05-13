export default function(state = {}, action) {
    if (action.type == "SET_USER_DATA") {
        state = {
            ...state,
            user: action.user
        };
    }

    return state;
}
