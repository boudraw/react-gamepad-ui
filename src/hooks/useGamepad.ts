import { useRef } from "react";
import { useGamepads } from "react-ts-gamepads";
import { getMappingForGamepad } from "../utils/mapping";
import { GamepadRef } from "react-ts-gamepads";
import {
  GamepadCallbacks,
  GamepadButtonStates,
  GamepadSpamTimeouts,
} from "../types/gamepad";
import { getGamepadEvents, processGamepadEvents } from "../utils/events";

const useGamepad = (callbacks: GamepadCallbacks) => {
  const buttonPressStatesRef = useRef<GamepadButtonStates>({});
  const spamTimeouts = useRef<GamepadSpamTimeouts>({});

  const onUpdate = (gamepads: GamepadRef) => {
    const gamepad = gamepads[0];
    if (!gamepad) {
      console.error("No gamepad detected.");
      return;
    }
    const mapping = getMappingForGamepad(gamepad);
    const currentEvents = getGamepadEvents(gamepad, mapping);
    processGamepadEvents(
      currentEvents,
      callbacks,
      buttonPressStatesRef.current,
      spamTimeouts.current
    );
  };

  useGamepads(onUpdate);
};

export default useGamepad;
