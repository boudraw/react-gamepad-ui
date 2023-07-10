import React, { useCallback, useContext, useState } from "react";

import { createContext } from "react";
import { GamepadRef, useGamepads } from "react-ts-gamepads";
import { getMappingForGamepad } from "../utils/mapping";
import { getGamepadEvents } from "../utils/events";
import { GamepadEvent, GamepadState } from "../types/gamepad";

interface GamepadStateProps {
  events: GamepadEvent[];
  state: GamepadState;
}

export const FocusContext = createContext<GamepadStateProps>({
  events: [],
  state: {
    buttonStates: {},
    spamTimeouts: {},
  },
});

export const useGamepadState = (): GamepadStateProps => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error("A Focus must be setted");
  }
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const GamepadProvider: React.FC<IProps> = ({ children }) => {
  const [events, setEvents] = useState<GamepadEvent[]>([]);

  const onUpdate = (gamepads: GamepadRef) => {
    const gamepad = gamepads[0];
    if (!gamepad) {
      console.error("No gamepad detected.");
      return;
    }
    const mapping = getMappingForGamepad(gamepad);
    const newEvents = getGamepadEvents(gamepad, mapping);
    setEvents(newEvents);
  };

  useGamepads(onUpdate);

  return (
    <FocusContext.Provider value={{ events, setFocus }}>
      {children}
    </FocusContext.Provider>
  );
};
