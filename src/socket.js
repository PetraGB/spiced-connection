import * as io from "socket.io-client";
// import {} from "./actions";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        // socket.on("event", data => {
        //     store.dispatch(action(data));
        // });
    }
}
