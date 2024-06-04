import { type PropsWithChildren } from "react";

type CourseGoalProps = PropsWithChildren<{
  id: number;
  title: string;
  description: string;
  onDeleteGoal: (id: number) => void;
}>;

export default function CourseGoal({
  id,
  title,
  description,
  onDeleteGoal,
}: CourseGoalProps) {
  return (
    <article className="course-goal">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button onClick={() => onDeleteGoal(id)}>Delete</button>
    </article>
  );
}
