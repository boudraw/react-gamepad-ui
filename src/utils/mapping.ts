import * as mappings from "../constants/mappings";
import { GamepadMapping } from "../types/gamepad";

export const getMappingForGamepad = (gamepad: Gamepad): GamepadMapping => {
  if (gamepad.id.includes("Xbox")) {
    // Xbox 360, Xbox One, and Xbox Series X|S controllers
    return mappings.Xbox;
  } else if (gamepad.id.includes("PlayStation")) {
    // PS4 and PS5 controllers
    return mappings.PlayStation;
  } else if (gamepad.id.includes("Pro Controller")) {
    // For Nintendo Switch
    return mappings.NintendoSwitch;
  } else if (gamepad.id.includes("Valve")) {
    // For Valve's Steam Controller or the Steam Deck
    return mappings.SteamDeck;
  } else {
    // If we can't determine the type of gamepad, we'll just default to one of the mappings
    // Alternatively, you could return null and handle this case in your UI
    // (for example, by showing a message telling the user that their gamepad is not supported)
    return mappings.Xbox;
  }
};
