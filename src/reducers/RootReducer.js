import { combineReducers } from 'redux';
import isOpen from "./TogglePickerReducer";
import date from "./DateReducer"

export default combineReducers({
  isOpen,
  date
});
