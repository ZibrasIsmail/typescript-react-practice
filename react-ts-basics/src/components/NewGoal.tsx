import { useRef, type FormEvent } from "react";
import { CourseGoalProps } from "../App";

export default function NewGoal({ setGoals }: { setGoals: Function }) {
  const goal = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if (!goal.current!.value || !summary.current!.value) return;

    const newGoal: CourseGoalProps = {
      id: Math.random(),
      title: goal.current!.value,
      description: summary.current!.value,
    };
    setGoals((prevGoals: CourseGoalProps[]) => [...prevGoals, newGoal]);

    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your goal</label>
        <input id="goal" type="text" ref={goal} />
      </p>
      <p>
        <label htmlFor="summary">Short summary</label>
        <input id="summary" type="text" ref={summary} />
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  );
}
