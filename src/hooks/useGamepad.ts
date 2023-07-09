import { useState } from "react";
import { useGamepads } from "react-gamepads";

import _isEqual from "lodash/isEqual";

const axesConfig = [
  { positiveType: "Right", negativeType: "Left" },
  { positiveType: "Down", negativeType: "Up" },
  { positiveType: "Right", negativeType: "Left" },
  { positiveType: "Down", negativeType: "Up" },
];

const axisPositiveThreshold = 0.5;
const axisNegativeThreshold = -0.5;

const useGamepad = () => {
  const [activeButtons, setActiveButtons] = useState();
  const [activeAxes, setActiveAxes] = useState();

  const seekChanges = (gamepads) => {
    const gamepadAxesState =
      gamepads && Object.keys(gamepads).length
        ? gamepads[Object.keys(gamepads)[0]].axes
        : [];

    const mapAxes = (axesToMap = []) => {
      return axesToMap.map((axis, i) => ({
        type: axesConfig[i],
        positiveValue: axis >= axisPositiveThreshold,
        negativeValue: axis <= axisNegativeThreshold,
        index: i,
      }));
    };
    const axes = mapAxes(gamepadAxesState);

    const buttons =
      gamepads && Object.keys(gamepads).length
        ? gamepads[Object.keys(gamepads)[0]].buttons.map(
            (button) => button.pressed
          )
        : [];

    if (!_isEqual(buttons, activeButtons)) setActiveButtons(buttons);
    if (!_isEqual(axes, activeAxes)) setActiveAxes(axes);
  };

  useGamepads((gamepads) => seekChanges(gamepads));

  return { buttons: activeButtons, axes: activeAxes };
};

export default useGamepad;
