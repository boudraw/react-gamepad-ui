import { SPAM_DELAY, SPAM_INTERVAL } from "../constants/spam";
import {
  GamepadCallback,
  GamepadCallbacks,
  GamepadEvent,
  GamepadMapping,
  GamepadState,
} from "../types/gamepad";

export const getGamepadEvents = (
  gamepad: Gamepad,
  mapping: GamepadMapping
): GamepadEvent[] => {
  const events: GamepadEvent[] = [];

  gamepad.buttons.forEach((button, index) => {
    if (button.pressed && mapping[index]) {
      events.push(mapping[index]);
    }
  });

  return events;
};

export const processGamepadEvents = (
  currentEvents: GamepadEvent[],
  state: GamepadState,
  callbacks: GamepadCallbacks
) => {
  // Handle button presses.
  for (const event of currentEvents) {
    const wasPressed = state.buttonStates[event];
    const callback = callbacks[event] as GamepadCallback;
    if (callback && !wasPressed) {
      if (typeof callback === "function") {
        callback();
      } else if (callback.onPress) {
        callback.onPress();
      }

      // Clear any existing timeout.
      if (state.spamTimeouts[event]) {
        clearTimeout(state.spamTimeouts[event]!);
      }

      // Create a new timeout.
      state.spamTimeouts[event] = setTimeout(() => {
        // Start spamming after a delay.
        state.spamTimeouts[event] = setInterval(() => {
          if (typeof callback === "function") {
            callback();
          } else if (callback.onPress) {
            callback.onPress();
          }
        }, SPAM_INTERVAL);
      }, SPAM_DELAY);
    }
    state.buttonStates[event] = true;
  }

  // Handle button releases.
  for (const event of Object.keys(state.buttonStates) as GamepadEvent[]) {
    if (
      !currentEvents.includes(event as GamepadEvent) &&
      state.buttonStates[event]
    ) {
      const callback = callbacks[event] as GamepadCallback;
      if (callback && "onRelease" in callback && callback.onRelease) {
        callback.onRelease();
      }

      // Clear the spam timeout.
      if (state.spamTimeouts[event]) {
        clearTimeout(state.spamTimeouts[event]!);
        state.spamTimeouts[event] = null;
      }

      state.buttonStates[event] = false;
    }
  }
};
