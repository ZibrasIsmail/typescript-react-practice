import { useEffect, useRef, useState } from "react";
import Container from "./UI/Container.tsx";
import { useTimers, type Timer } from "./store/timers-Context.tsx";

export default function Timer({ name, duration }: Timer) {
  const interval = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const { isRunning } = useTimers();

  if (remainingTime <= 0) {
    clearInterval(interval.current ?? 0);
  }

  useEffect(() => {
    if (isRunning) {
      interval.current = window.setInterval(function () {
        setRemainingTime((prevTime) => prevTime - 50);
      }, 50);
    } else if (interval.current) {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current ?? 0);
    };
  }, [isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
