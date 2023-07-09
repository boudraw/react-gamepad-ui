import {
  GamepadButtonStates,
  GamepadCallbacks,
  GamepadEvent,
  GamepadMapping,
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
  buttonPressStates: GamepadButtonStates,
  callbacks: GamepadCallbacks
) => {
  const newButtonPressStates = { ...buttonPressStates };
  for (const event of currentEvents) {
    const callback = callbacks[event];
    if (callback) {
      if (typeof callback === "function") {
        callback();
      } else if (callback.onPress) {
        callback.onPress();
      }
    }
    newButtonPressStates[event] = true;
  }
  for (const event of Object.keys(buttonPressStates) as GamepadEvent[]) {
    if (!currentEvents.includes(event) && buttonPressStates[event]) {
      const callback = callbacks[event];
      if (callback && "onRelease" in callback && callback.onRelease) {
        callback.onRelease();
      }
      newButtonPressStates[event] = false;
    }
  }
  return newButtonPressStates;
};
