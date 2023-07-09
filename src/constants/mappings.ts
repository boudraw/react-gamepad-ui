import { GamepadMapping } from "../types/gamepad";

export const Xbox: GamepadMapping = {
  0: "onConfirm", // A
  1: "onBack", // B
  2: "onAction1", // X
  3: "onAction2", // Y
  9: "onStart", // Start
  8: "onOptions", // Back
  4: "onPrev", // LB
  5: "onNext", // RB
  6: "onDecrease", // LT
  7: "onIncrease", // RT
  12: "onUp", // DpadUp
  13: "onDown", // DpadDown
  14: "onLeft", // DpadLeft
  15: "onRight", // DpadRight
};

export const PlayStation: GamepadMapping = {
  0: "onConfirm", // Cross
  1: "onBack", // Circle
  2: "onAction1", // Square
  3: "onAction2", // Triangle
  9: "onStart", // Start
  8: "onOptions", // Select
  4: "onPrev", // L1
  5: "onNext", // R1
  6: "onDecrease", // L2
  7: "onIncrease", // R2
  12: "onUp", // DpadUp
  13: "onDown", // DpadDown
  14: "onLeft", // DpadLeft
  15: "onRight", // DpadRight
};

export const NintendoSwitch: GamepadMapping = {
  0: "onConfirm", // A
  1: "onBack", // B
  2: "onAction1", // X
  3: "onAction2", // Y
  9: "onStart", // Plus
  8: "onOptions", // Minus
  4: "onPrev", // L
  5: "onNext", // R
  6: "onDecrease", // ZL
  7: "onIncrease", // ZR
  12: "onUp", // DpadUp
  13: "onDown", // DpadDown
  14: "onLeft", // DpadLeft
  15: "onRight", // DpadRight
};

export const SteamDeck: GamepadMapping = {
  0: "onConfirm", // A
  1: "onBack", // B
  2: "onAction1", // X
  3: "onAction2", // Y
  9: "onStart", // Start
  8: "onOptions", // Select
  4: "onPrev", // LB
  5: "onNext", // RB
  6: "onDecrease", // LT
  7: "onIncrease", // RT
  12: "onUp", // DpadUp
  13: "onDown", // DpadDown
  14: "onLeft", // DpadLeft
  15: "onRight", // DpadRight
};
