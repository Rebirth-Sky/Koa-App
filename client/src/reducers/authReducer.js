
import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from '../validation/is-Empty'

const initialState = {
    isAuthenticated: false,
    user: {}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            // const newState = JSON.parse(JSON.stringify(state));
            return {
                ...state,
                user: action.payLoad,
                isAuthenticated: !isEmpty(action.payLoad)
            }
        default: return state;
    }

}