import { useState } from "react";
import { useGamepads } from "react-ts-gamepads";
import { getMappingForGamepad } from "../utils/mapping";
import { GamepadRef } from "react-ts-gamepads";
import { GamepadCallbacks, GamepadButtonStates } from "../types/gamepad";
import { getGamepadEvents, processGamepadEvents } from "../utils/events";

const useGamepad = (callbacks: GamepadCallbacks) => {
  const [buttonPressStates, setButtonPressStates] =
    useState<GamepadButtonStates>({});

  const onUpdate = (gamepads: GamepadRef) => {
    const gamepadKey = Object.keys(gamepads)[0];
    const gamepad = gamepads[gamepadKey];
    if (!gamepad) {
      console.error("No gamepad detected.");
      return;
    }
    const mapping = getMappingForGamepad(gamepad);
    const currentEvents = getGamepadEvents(gamepad, mapping);
    const newButtonPressStates = processGamepadEvents(
      currentEvents,
      buttonPressStates,
      callbacks
    );
    setButtonPressStates(newButtonPressStates);
  };

  useGamepads((gamepads) => onUpdate(gamepads));

  return buttonPressStates;
};

export default useGamepad;
