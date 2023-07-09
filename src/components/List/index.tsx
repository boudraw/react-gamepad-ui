import React from "react";
import Item from "../Item";
import useGamepad from "../../hooks/useGamepad";

type Props = {
  items: [];
};

const List = (props: Props) => {
  const [selectedChildIndex, setSelectedChildIndex] = React.useState(0);

  useGamepad({
    onUp: () => {
      setSelectedChildIndex((selectedChildIndex + 1) % props.items.length);
    },
    onDown: () => {
      setSelectedChildIndex((selectedChildIndex - 1) % props.items.length);
    },
  });

  return (
    <div>
      {props.items.map((item, key) => (
        <Item item={item} key={key} isSelected={selectedChildIndex == key} />
      ))}
    </div>
  );
};

export default List;
