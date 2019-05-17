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

export function updateUserPics(pictureDetails) {
    return {
        type: "UPDATE_USER_PICS",
        pictures: pictureDetails.pictures,
        atpicture: pictureDetails.atpicture
    };
}
