import React, { useState } from 'react';
import Confetti from 'react-confetti'
import './App.css';
import dayjs from 'dayjs';
import { type } from 'os';

export default function Clock() {
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  setInterval(() => {
    setSecondsRemaining(60 - dayjs().second());
  });

  return(<div className="clock-app">
    <div>{dayjs().add(1, "minute").format("YYYY-MM-DD HH:mm")}</div>
    <div>{secondsRemaining}</div>
    <Explosion secondsRemaining={secondsRemaining} />
  </div>)
}

type TimeDisplayProps = {
  secondsRemaining: number;
}

function TimeDisplay(props: TimeDisplayProps) {
  return(<div className="time-display"></div>)
}

type ExplosionProps = {
  secondsRemaining: number;
}

function Explosion(props: ExplosionProps) {
  if (props.secondsRemaining > 55) {
    return(<Confetti
      confettiSource={{ x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 300, w: 600, h: 600}}
    />);
  }
  return(<></>)
}