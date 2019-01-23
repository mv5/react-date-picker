import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { togglePicker } from "./actions/TogglePicker";
import { setDate } from "./actions/SetDate";
import Select from "react-select";

class App extends Component {
  constructor(props) {
    super(props);
    this.maxMonthIndex = props.date.now.getMonth() + 12;

    this.monthOfYear = [
      {
        name: "ינואר",
        length: 31
      },
      {
        name: "פברואר",
        length: new Date(this.props.date.currentYear, 2, 0).getDate()
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

    this.pickerMonthsList = this.createMonthsList();

    this.days = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"];
  }

  printDate(day) {
    const { selectedMonthIndex, currentYear } = this.props.date;
    console.log(new Date(currentYear, selectedMonthIndex, day));
  }

  createMonthsList() {
    const { now } = this.props.date;
    let months = [];
    for (let i = now.getMonth(); i <= this.maxMonthIndex; i++) {
      months.push({
        value: i,
        label: `${this.monthOfYear[i % 12].name} ${
          i < 12 ? now.getFullYear() : now.getFullYear() + 1
        }`
      });
    }
    return months;
  }

  createMonthDays() {
    const {
      selectedMonthIndex,
      firstOfMonth,
      currentYear,
      now
    } = this.props.date;
    const firstAvailableDate =
      now.getMonth() === +selectedMonthIndex &&
      currentYear === now.getFullYear()
        ? now.getDate()
        : 0;
    let days = [];
    for (let i = 1; i <= this.monthOfYear[+selectedMonthIndex].length; i++) {
      days.push(
        <div
          className={i >= firstAvailableDate ? "day-num available" : "day-num"}
          key={i}
          style={{
            marginRight: i === 1 ? firstOfMonth * 39 + "px" : 0,
            backgroundColor: i >= firstAvailableDate ? "#DDE9EA" : "",
            color: i >= firstAvailableDate ? "#5191B2" : "#D3D7DE",
            cursor: i >= firstAvailableDate ? "pointer" : "default"
          }}
          onClick={i >= firstAvailableDate ? () => this.printDate(i) : null}
        >
          {i}
        </div>
      );
    }
    return days;
  }

  setDates = month => {
    const { currentYear, now } = this.props.date;
    let monthIndex =
      month.value < 0
        ? this.maxMonthIndex - 1
        : month.value > this.maxMonthIndex
        ? 0
        : month.value;
    let year = now.getFullYear();
    let yearToUpdate =
      monthIndex > 11 && currentYear === year ? year + 1 : year;

    this.props.setDate({
      selectedMonthIndex: monthIndex % 12,
      month: month,
      firstOfMonth: new Date(yearToUpdate, monthIndex % 12, 1).getDay(),
      currentYear: yearToUpdate
    });
  };

  render() {
    const { isOpen, togglePicker } = this.props;
    const { selectedMonthIndex, currentYear, month, now } = this.props.date;
    const prevMonthIndex =
      selectedMonthIndex > 0 ? selectedMonthIndex - 1 : this.maxMonthIndex - 1;

    return (
      <div className="App">
        {isOpen ? (
          <div className="date-picker">
            <button className="close" onClick={() => togglePicker(false)}>
              &#10005;
            </button>
            <div className="content">
              <h2 className="title">תאריך יציאה</h2>
              <div className="month">
                <button
                  onClick={() =>
                    this.setDates(this.pickerMonthsList[prevMonthIndex])
                  }
                  disabled={
                    selectedMonthIndex === now.getMonth() &&
                    currentYear === now.getFullYear()
                  }
                  className={
                    selectedMonthIndex === now.getMonth() &&
                    currentYear === now.getFullYear()
                      ? "disabled btn"
                      : "btn"
                  }
                >
                  &lt;
                </button>
                <Select
                  value={month}
                  onChange={this.setDates}
                  className="month-list"
                  classNamePrefix="month-option"
                  options={this.pickerMonthsList}
                />
                <button
                  onClick={() =>
                    this.setDates(this.pickerMonthsList[selectedMonthIndex + 1])
                  }
                  disabled={
                    selectedMonthIndex === this.maxMonthIndex % 12 &&
                    currentYear === now.getFullYear() + 1
                  }
                  className={
                    selectedMonthIndex === now.getMonth() &&
                    currentYear === now.getFullYear() + 1
                      ? "disabled btn"
                      : "btn"
                  }
                >
                  &gt;
                </button>
              </div>
              <div className="day-container">
                <div className="day">
                  {this.days.map(day => (
                    <div key={day} className="day-title">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="date">{this.createMonthDays()}</div>
              </div>
              <div className="footer" />
            </div>
          </div>
        ) : (
          <button onClick={() => togglePicker(true)}>Open Date Picker</button>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  togglePicker: isOpen => dispatch(togglePicker(isOpen)),
  setDate: data => dispatch(setDate(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
