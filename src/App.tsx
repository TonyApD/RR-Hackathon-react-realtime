import React, { useState } from 'react';
import Confetti from 'react-confetti'
import './App.css';
import dayjs from 'dayjs';

export default function Clock() {
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [exploding, setExploding] = useState(false);
  const [vibrating, setVibrating] = useState(false);
  const [animationDuration, setAnimationDuration] = useState('1s');

  setInterval(() => {
    const remaing = (60 - dayjs().second()) % 60;
    setSecondsRemaining(remaing);
    setExploding(remaing === 0 || remaing >= 57);
    setVibrating(remaing >= 1 && remaing <= 4);

    if(vibrating){
      setAnimationDuration(`${remaing/10}s`)
    }
  });

  let vibratingCls = vibrating ? 'vibrator' : '';

  return(<div className={`clock-app ${vibratingCls}`} style={{"animationDuration" : animationDuration }}>
    <div className="dynamite">
      <div className="dynamite-line"></div>
      <div className="dynamite-line"></div>
      <div className="dynamite-line"></div>
    </div>
    <div className="dynamite dynamite-shadow">
      <div className="dynamite-line"></div>
      <div className="dynamite-line"></div>
      <div className="dynamite-line"></div>
    </div>
    <div className="dynamite">
      <div className="dynamite-line"></div>
      <div className="dynamite-line"></div>
      <div className="dynamite-line"></div>
    </div>
    <div className="ticking-clock">
      <TimeDisplayHeader />
      <TimeDisplay secondsRemaining={secondsRemaining} />
    </div>
    <Explosion exploding={exploding} />
  </div>)
}

function TimeDisplayHeader() {
  return (<div className="time-display-header">
    {dayjs().add(1, "minute").format("YYYY-MM-DD HH:mm")}
    </div>)
}

type TimeDisplayProps = {
  secondsRemaining: number;
}

function TimeDisplay(props: TimeDisplayProps) {
  let displayValue = "00:" + props.secondsRemaining;
  if (props.secondsRemaining < 10) {
    displayValue = "00:0" + props.secondsRemaining;
  }

  return(<div className="time-display">
    <div>{displayValue}</div>
  </div>)
}

type ExplosionProps = {
  exploding: boolean;
}

function Explosion(props: ExplosionProps) {
  if (props.exploding) {
    return(<Confetti className='confetti'
      confettiSource={{ x: window.innerWidth / 2 - 300, y: window.innerHeight / 2 - 300, w: 600, h: 600}}
    />);
  }
  return(<></>)
}