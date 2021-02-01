import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from '../utils/duration';
import { secondsToDuration } from '../utils/duration';
import { BreakDuration, FocusDuration } from "./timerDuration";
import PlayStopButtons from "./PlayStopButtons";

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Timer starts out paused
  const [initialPlay, setInitialPlay] = useState(true); //sets each session's inital start
  const [onBreak, setOnBreak] = useState(false); // starts break when true
  const [activeSession, setActiveSession] = useState(false); // starts a session

  const [focusDurationMins, setfocusDurationMins] = useState(25);
  const [breakDurationMins, setbreakDurationMins] = useState(5);
  const [durationMins, setDurationMins] = useState(25);
  const [durationSecs, setDurationSecs] = useState(0);
  const [initialDuration, setInitialDuration] = useState(25);
  const [initialBreakDuration, setInitialBreakDuration] = useState(5);

  const [timerProgress, setTimerProgress] = useState(0);

  const decreaseFocusTime = () => {
    if (focusDurationMins > 5 && !isTimerRunning && initialPlay)
      setfocusDurationMins((minutes) => (minutes -= 5));
  };

  const increaseFocusTime = () => {
    if (focusDurationMins < 60 && !isTimerRunning && initialPlay)
      setfocusDurationMins((minutes) => (minutes += 5));
  };

  const decreaseBreakTime = () => {
    if (breakDurationMins > 1 && !isTimerRunning && initialPlay)
      setbreakDurationMins((minutes) => (minutes -= 1));
  };

  const increaseBreakTime = () => {
    if (breakDurationMins < 15 && !isTimerRunning && initialPlay)
      setbreakDurationMins((minutes) => (minutes += 1));
  };

  function percentage(currentMinutes, currentSeconds, initialMinutes) {
    return (
      100 -
      ((currentMinutes * 60 + currentSeconds) / (initialMinutes * 60)) * 100
    );
  }

  function timerExpired() {
    if (!onBreak) {
      //will change
      new Audio(`https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-27787/zapsplat_bell_medium_large_soft_hit_chime_001_29436.mp3?_=1`).play();
      setOnBreak((state) => (state = true));
      setTimerProgress((progress) => (progress = 0));
      setDurationSecs((seconds) => (seconds = 0));
      setDurationMins((minutes) => (minutes = initialBreakDuration));
    } else {
      new Audio(`https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-two/household_alarm_clock_beep_tone.mp3?_=1`).play();
      setOnBreak((state) => (state = false));
      setTimerProgress((progress) => (progress = 0));
      setDurationSecs((seconds) => (seconds = 0));
      setDurationMins((minutes) => (minutes = initialDuration));
    }
  }

  useInterval(
    () => {
      //While timer runs
      setDurationSecs((second) => {
        second === 0 ? (second = 59) : (second -= 1); //seconds count down, cycles over minute
        if (second === 59)
          setDurationMins((minutes) => (minutes = durationMins - 1));
        return second;
      });

      if (onBreak) {
        setTimerProgress(
          (currentProgress) =>
            (currentProgress = percentage(
              durationMins,
              durationSecs,
              initialBreakDuration
            ))
        );
      } else {
        setTimerProgress(
          (currentProgress) =>
            (currentProgress = percentage(
              durationMins,
              durationSecs,
              initialDuration
            ))
        );
      }

      if (durationMins === 0 && durationSecs === 1) {
        timerExpired();
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    if (initialPlay) {
      setInitialDuration((duration) => (duration = focusDurationMins));
      setInitialBreakDuration((duration) => (duration = breakDurationMins));
      setDurationMins((duration) => (duration = focusDurationMins));
      setInitialPlay((state) => (state = false));
    }
    setActiveSession((state) => (state = true));
    setIsTimerRunning((prevState) => !prevState);
  }

  function stopButton() {
    setInitialPlay((state) => (state = true));
    setIsTimerRunning((state) => (state = false));
    setOnBreak((state) => (state = false));
    setActiveSession((state) => (state = false));

    setTimerProgress((progress) => (progress = 0));
    setDurationSecs((seconds) => (seconds = 0));
    setDurationMins((duration) => (duration = focusDurationMins));
    setInitialDuration((duration) => (duration = focusDurationMins));
    setInitialBreakDuration((duration) => (duration = breakDurationMins));
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusDuration
          focusDurationMins={focusDurationMins}
          decreaseFocusTime={decreaseFocusTime}
          increaseFocusTime={increaseFocusTime}
        />
        <BreakDuration
          breakDurationMins={breakDurationMins}
          decreaseBreakTime={decreaseBreakTime}
          increaseBreakTime={increaseBreakTime}
        />
      </div>
      <PlayStopButtons
        playPause={playPause}
        classNames={classNames}
        isTimerRunning={isTimerRunning}
        stopButton={stopButton}
      />
      <div style={activeSession ? { display: "block" } : { display: "none" }}>
        <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">
              {!onBreak ? "Focusing" : "On Break"} for{" "}
              {!onBreak
                ? minutesToDuration(initialDuration)
                : minutesToDuration(initialBreakDuration)}{" "}
              minutes
            </h2>
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(durationMins * 60 + durationSecs)} remaining
            </p>
            {!isTimerRunning ? <h2>PAUSED</h2> : null}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={timerProgress}
                style={{ width: `${timerProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
