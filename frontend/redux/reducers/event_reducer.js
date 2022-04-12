import { ADD_EVENT, EDIT_EVENT } from "../actions/type";
const initialState = [
    {
        topic: "",
        event_name: "",
        start_at: "",
        end_at: "",
        description: "",
        status: 0,
        lat: 120,
        long: 120,
        images: [],
    },
];

export default function (state = initialState, payload) {
    switch (payload.type) {
        case ADD_EVENT:
            return [...state, payload.event];
        case EDIT_EVENT: {
            return [...state, payload.event];
        }
        default:
            return state;
    }
}
