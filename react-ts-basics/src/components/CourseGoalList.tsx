import { ReactNode } from "react";
import { type CourseGoalProps } from "../App";
import CourseGoal from "./CourseGoal";
import InfoBox from "./InfoBox";

export type CourseGoalListProps = {
  goals: CourseGoalProps[];
  onDeleteGoal: (id: number) => void;
};

export default function CourseGoalList({
  goals,
  onDeleteGoal,
}: CourseGoalListProps) {
  if (goals.length === 0) {
    return (
      <InfoBox mode="hint">You have no course yet. Start adding some</InfoBox>
    );
  }

  let warningBox: ReactNode;

  if (goals.length >= 4) {
    warningBox = (
      <InfoBox mode="warning" severity="high">
        You have reached the maximum amount of goals
      </InfoBox>
    );
  }

  return (
    <>
      {warningBox}
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <CourseGoal
              id={goal.id}
              key={goal.id}
              title={goal.title}
              description={goal.description}
              onDeleteGoal={onDeleteGoal}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
