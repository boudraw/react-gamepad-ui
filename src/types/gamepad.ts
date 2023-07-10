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

export type GamepadButtonStates = Partial<Record<GamepadEvent, boolean>>;

export interface GamepadButtonCallback {
  onPress?: () => any;
  onRelease?: () => any;
}
export type GamepadCallback = GamepadButtonCallback | (() => any);
export type GamepadCallbacks = Partial<Record<GamepadEvent, GamepadCallback>>;

export type GamepadSpamTimeouts = Partial<
  Record<GamepadEvent, NodeJS.Timeout | null>
>;

export interface GamepadState {
  buttonStates: GamepadButtonStates;
  spamTimeouts: GamepadSpamTimeouts;
}
