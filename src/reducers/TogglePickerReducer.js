import { TOGGLE_PICKER } from "../constants"

export default (state = true, action) => {
    switch (action.type) {
      case TOGGLE_PICKER:
        return action.payload;
      default:
        return state;
    }
}