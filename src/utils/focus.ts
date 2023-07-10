import { IFocus } from "../types/focus";

export const focusMatches = (focus?: IFocus | null, focusID?: string) => {
  return (focus?.id || null) === (focusID || null);
};
