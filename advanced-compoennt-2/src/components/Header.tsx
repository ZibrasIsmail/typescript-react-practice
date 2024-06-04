import Button from "./UI/Button.tsx";
import { useTimers } from "./store/timers-Context.tsx";

export default function Header() {
  const timers = useTimers();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={timers.isRunning ? timers.stopTimer : timers.startTimer}>
        {timers.isRunning ? "Stop" : "Start"} Timers
      </Button>
    </header>
  );
}
