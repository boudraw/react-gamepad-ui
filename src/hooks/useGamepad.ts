import { useCallback, useEffect, useRef } from "react";
import { useGamepads } from "react-ts-gamepads";
import { getMappingForGamepad } from "../utils/mapping";
import { GamepadRef } from "react-ts-gamepads";
import {
  GamepadCallbacks,
  GamepadButtonStates,
  GamepadSpamTimeouts,
  GamepadState,
} from "../types/gamepad";
import { getGamepadEvents, processGamepadEvents } from "../utils/events";
import { useFocus } from "../contexts/FocusContext";
import { focusMatches } from "../utils/focus";

const useGamepad = (callbacks: GamepadCallbacks, focusID?: string) => {
  const { focus } = useFocus();
  const focusRef = useRef(focus);

  const state = useRef<GamepadState>({
    buttonStates: {},
    spamTimeouts: {},
  });

  useEffect(() => {
    focusRef.current = focus;

    return () => {
      Object.values(state.current.spamTimeouts).forEach((timeout) =>
        clearTimeout(timeout || undefined)
      );
      state.current.buttonStates = {};
    };
  }, [focus]);

  const onUpdate = useCallback(
    (gamepads: GamepadRef) => {
      // use focusRef instead of focus to circumvent useGamepads only using the initial focus value
      if (!focusMatches(focusRef.current, focusID)) return;

      const gamepad = gamepads[0];
      if (!gamepad) {
        console.error("No gamepad detected.");
        return;
      }
      const mapping = getMappingForGamepad(gamepad);
      const currentEvents = getGamepadEvents(gamepad, mapping);
      processGamepadEvents(currentEvents, state.current, callbacks);
    },
    [focusID]
  );

  useGamepads(onUpdate);
};

export default useGamepad;
