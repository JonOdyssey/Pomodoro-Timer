import React from "react";
import { minutesToDuration } from "../utils/duration";

export function BreakDuration(props) {
  const {
    breakDurationMins,
    increaseBreakTime,
    decreaseBreakTime,
  } = props;
  return (
    <div className="col">
      <div className="float-right">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-break">
            {/* TODO: Update this text to display the current break session duration */}
            Break Duration: {minutesToDuration(breakDurationMins)}
          </span>
          <div className="input-group-append">
            {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
            <button
              onClick={decreaseBreakTime}
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
            >
              <span className="oi oi-minus" />
            </button>
            {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
            <button
              onClick={increaseBreakTime}
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FocusDuration(props) {
  const {
    focusDurationMins,
    increaseFocusTime,
    decreaseFocusTime,
  } = props;
  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          {/* TODO: Update this text to display the current focus session duration */}
          Focus Duration: {minutesToDuration(focusDurationMins)}
        </span>
        <div className="input-group-append">
          {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
          <button
            onClick={decreaseFocusTime}
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
          >
            <span className="oi oi-minus" />
          </button>
          {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
          <button
            onClick={increaseFocusTime}
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}
