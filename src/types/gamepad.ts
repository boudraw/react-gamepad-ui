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
  onPress?: () => any;
  onRelease?: () => any;
}
export type GamepadCallback = GamepadButtonCallback | (() => any);
export type GamepadCallbacks = Record<Partial<GamepadEvent>, GamepadCallback>;

export type GamepadSpamTimeouts = Record<GamepadEvent, NodeJS.Timeout | null>;
