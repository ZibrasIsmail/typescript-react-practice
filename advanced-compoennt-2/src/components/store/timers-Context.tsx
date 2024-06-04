import { type ReactNode, createContext, useContext, useReducer } from "react";

export type Timer = {
  name: string;
  duration: number;
};
export type TimersStateProps = {
  isRunning: boolean;
  timers: Timer[];
};
type TimersContextValueProps = TimersStateProps & {
  addTimer: (timerData: Timer) => void;
  startTimer: () => void;
  stopTimer: () => void;
};

const initialState: TimersStateProps = {
  isRunning: false,
  timers: [],
};

const TimersContext = createContext<TimersContextValueProps | null>(null);

type TimersProviderProps = {
  children: ReactNode;
};

type StartTimerProps = {
  type: "START_TIMER";
};

type StopTimerProps = {
  type: "STOP_TIMER";
};

type AddTimerProps = {
  type: "ADD_TIMER";
  payload: Timer;
};

type ActionProps = StartTimerProps | StopTimerProps | AddTimerProps;
function reducer(
  state: TimersStateProps,
  action: ActionProps
): TimersStateProps {
  switch (action.type) {
    case "ADD_TIMER":
      return {
        ...state,
        isRunning: true,
        timers: [
          ...state.timers,
          {
            name: action.payload.name,
            duration: action.payload.duration,
          },
        ],
      };
    case "START_TIMER":
      return {
        ...state,
        isRunning: true,
      };
    case "STOP_TIMER":
      return {
        ...state,
        isRunning: false,
      };
    default:
      return state;
  }
}

export function TimersContextProvider({ children }: TimersProviderProps) {
  const [timersState, dispatch] = useReducer(reducer, initialState);

  const ctx: TimersContextValueProps = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData: Timer) {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimer() {
      dispatch({ type: "START_TIMER" });
    },
    stopTimer() {
      dispatch({ type: "STOP_TIMER" });
    },
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}

export function useTimers() {
  const context = useContext(TimersContext);

  if (!context) {
    throw new Error("useTimers must be used within a TimersProvider");
  }

  return context;
}
