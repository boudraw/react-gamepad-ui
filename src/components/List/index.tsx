import React, { useCallback, useEffect, useRef, useState } from "react";
import Item from "../Item";
import useGamepad from "../../hooks/useGamepad";

import "./index.css";
import { Item as ItemType } from "../../types/list";
import { smoothScrollToItem } from "../../utils/smoothScroll";

type Props = {
  items: ItemType[];
  type?: "horizontal" | "vertical";
  onConfirm?: (item: ItemType) => void;
};

const List = ({ items, type = "horizontal", onConfirm }: Props) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [isConfirmDown, setIsConfirmDown] = useState<boolean>(false);

  const itemRefs = useRef<React.Ref<any>[]>([]);
  itemRefs.current = items.map(() => React.createRef());

  useEffect(() => {
    const item = itemRefs.current[selectedItemIndex];
    if (!item || !("current" in item)) return;
    const element = item.current as HTMLDivElement;
    if (!element) return;

    smoothScrollToItem(element);
  }, [selectedItemIndex, itemRefs]);

  const onPrev = () => {
    setSelectedItemIndex((prevIndex) => {
      if (prevIndex === 0) return items.length - 1;
      return (prevIndex - 1) % items.length;
    });
  };
  const onNext = () => {
    setSelectedItemIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  useEffect(() => {
    if (isConfirmDown && onConfirm) onConfirm(items[selectedItemIndex]);
  }, [onConfirm, isConfirmDown, items, selectedItemIndex]);

  useGamepad({
    onConfirm: {
      onPress: () => {
        setIsConfirmDown(true);
      },
      onRelease: () => {
        setIsConfirmDown(false);
      },
    },
    onUp: () => {
      if (type === "horizontal") return;
      onPrev();
    },
    onDown: () => {
      if (type === "horizontal") return;
      onNext();
    },
    onRight: () => {
      if (type === "vertical") return;
      onNext();
    },
    onLeft: () => {
      if (type === "vertical") return;
      onPrev();
    },
  });

  return (
    <div className={`list ${type}`}>
      {items.map((item, index) => (
        <Item
          ref={itemRefs.current[index]}
          item={item}
          key={item.id}
          isSelected={selectedItemIndex == index}
          isPressed={selectedItemIndex == index && isConfirmDown}
        />
      ))}
    </div>
  );
};

export default List;
