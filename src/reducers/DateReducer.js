import { SET_DATE } from "../constants";

const now = new Date();
const months = [
  {
    name: "ינואר",
    length: 31
  },
  {
    name: "פברואר",
    length: new Date(now.getFullYear(), 2, 0).getDate()
  },
  {
    name: "מרץ",
    length: 31
  },
  {
    name: "אפריל",
    length: 30
  },
  {
    name: "מאי",
    length: 31
  },
  {
    name: "יוני",
    length: 30
  },
  {
    name: "יולי",
    length: 31
  },
  {
    name: "אוגוסט",
    length: 31
  },
  {
    name: "ספטמבר",
    length: 30
  },
  {
    name: "אוקטובר",
    length: 31
  },
  {
    name: "נובמבר",
    length: 30
  },
  {
    name: "דצמבר",
    length: 31
  }
];
const initialState = {
  selectedMonthIndex: now.getMonth(),
  month: {
    value: now.getMonth(),
    label: `${months[now.getMonth()].name} ${now.getFullYear()}`
  },
  currentYear: now.getFullYear(),
  firstOfMonth: now.getDay(),
  now
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
