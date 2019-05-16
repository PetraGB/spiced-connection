export function setUserData(user) {
    return {
        type: "SET_USER_DATA",
        user
    };
}

export function setNewRead(readId) {
    return {
        type: "ADD_TO_READ",
        readId
    };
}
