import { useTimers } from "./store/timers-Context";
import Timer from "./Timer.tsx";

export default function Timers() {
  const { timers } = useTimers();

  return (
    <ul>
      {timers.map((timer, index) => (
        <li key={index}>
          <Timer {...timer} />
        </li>
      ))}
    </ul>
  );
}
