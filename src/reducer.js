export default function(state = {}, action) {
    if (action.type == "SET_USER_DATA") {
        state = {
            ...state,
            user: action.user
        };
    }

    if (action.type == "ADD_TO_READ") {
        state = {
            ...state,
            user: {
                ...state.user,
                read: [...state.user.read, action.readId]
            }
        };
    }

    return state;
}
