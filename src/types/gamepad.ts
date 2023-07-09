export type GamepadEvent =
  | "onConfirm"
  | "onBack"
  | "onAction1"
  | "onAction2"
  | "onStart"
  | "onOptions"
  | "onPrev"
  | "onNext"
  | "onDecrease"
  | "onIncrease"
  | "onUp"
  | "onDown"
  | "onLeft"
  | "onRight";

export interface GamepadMapping {
  [button: number]: GamepadEvent;
}

export type GamepadButtonStates = Record<GamepadEvent, boolean>;

export interface GamepadButtonCallback {
  onPress?: () => void;
  onRelease?: () => void;
}
export type GamepadCallback = GamepadButtonCallback | (() => void);
export type GamepadCallbacks = Record<GamepadEvent, GamepadCallback>;
