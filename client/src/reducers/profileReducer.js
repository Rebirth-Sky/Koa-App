import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, Clear_Current_Profile } from "../actions/types";

const initialState = {
    profile: null,
    profiles: null,
    loading: false

}
export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payLoad,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payLoad,
                loading: false
            }

        case Clear_Current_Profile:
            return {
                ...state,
                profile: null
            }
        default: return state;
    }

}