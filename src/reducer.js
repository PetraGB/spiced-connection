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

    if (action.type == "UPDATE_USER_PICS") {
        state = {
            ...state,
            user: {
                ...state.user,
                pictures: action.pictures,
                atpicture: action.atpicture
            }
        };
    }

    return state;
}
