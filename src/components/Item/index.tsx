import React from "react";
import { Item } from "../../types/list";

type Props = {
  item: Item;
  isSelected: boolean;
};

const Item = ({ item, isSelected }: Props) => {
  return (
    <div className={`item ${isSelected ? " selected" : ""}`}>
      {item.render(isSelected)}
    </div>
  );
};

export default Item;
