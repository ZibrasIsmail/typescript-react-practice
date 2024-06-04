import { useState } from "react";

import goalsImg from "./assets/goals.jpg";
import CourseGoalList from "./components/CourseGoalList";
import Header from "./components/Header";
import NewGoal from "./components/NewGoal";

export type CourseGoalProps = {
  title: string;
  description: string;
  id: number;
};

export default function App() {
  const [goals, setGoals] = useState<CourseGoalProps[]>([]);

  function handleDeleteGoal(id: number) {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  }

  return (
    <main>
      <Header image={{ src: goalsImg, alt: "A list of goals" }}>
        <h1>Your Course Goals</h1>
      </Header>
      <NewGoal setGoals={setGoals} />
      <CourseGoalList goals={goals} onDeleteGoal={handleDeleteGoal} />
    </main>
  );
}
