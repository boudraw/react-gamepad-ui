import { SPAM_DELAY, SPAM_INTERVAL } from "../constants/spam";
import {
  GamepadButtonStates,
  GamepadCallback,
  GamepadCallbacks,
  GamepadEvent,
  GamepadMapping,
  GamepadSpamTimeouts,
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
  callbacks: GamepadCallbacks,
  buttonPressStates: GamepadButtonStates,
  spamTimeouts: GamepadSpamTimeouts
) => {
  // Handle button presses.
  for (const event of currentEvents) {
    const wasPressed = buttonPressStates[event];
    const callback = callbacks[event] as GamepadCallback;
    if (callback && !wasPressed) {
      if (typeof callback === "function") {
        callback();
      } else if (callback.onPress) {
        callback.onPress();
      }

      // Clear any existing timeout.
      if (spamTimeouts[event]) {
        clearTimeout(spamTimeouts[event]!);
      }

      // Create a new timeout.
      spamTimeouts[event] = setTimeout(() => {
        // Start spamming after a delay.
        spamTimeouts[event] = setInterval(() => {
          if (typeof callback === "function") {
            callback();
          } else if (callback.onPress) {
            callback.onPress();
          }
        }, SPAM_INTERVAL);
      }, SPAM_DELAY);
    }
    buttonPressStates[event] = true;
  }

  // Handle button releases.
  for (const event of Object.keys(buttonPressStates) as GamepadEvent[]) {
    if (
      !currentEvents.includes(event as GamepadEvent) &&
      buttonPressStates[event]
    ) {
      const callback = callbacks[event] as GamepadCallback;
      if (callback && "onRelease" in callback && callback.onRelease) {
        callback.onRelease();
      }

      // Clear the spam timeout.
      if (spamTimeouts[event]) {
        clearTimeout(spamTimeouts[event]!);
        spamTimeouts[event] = null;
      }

      buttonPressStates[event] = false;
    }
  }
};
