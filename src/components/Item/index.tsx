import React, { useMemo } from "react";
import { Item as ItemType } from "../../types/list";

import "./index.css";

type Props = {
  item: ItemType;
  isSelected: boolean;
  isPressed?: boolean;
};

const Item = React.forwardRef<HTMLDivElement, Props>(
  ({ item, isSelected, isPressed }, ref) => {
    const renderedChild = useMemo(() => item.render(), [item]);

    return (
      <div
        ref={ref}
        className={`item${isSelected ? " selected" : ""}${
          isPressed ? " pressed" : ""
        }`}
      >
        {renderedChild}
      </div>
    );
  }
);

export default Item;
