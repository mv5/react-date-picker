import { TOGGLE_PICKER } from "../constants";

export const togglePicker = isOpen => ({
  type: TOGGLE_PICKER,
  payload: isOpen
});
