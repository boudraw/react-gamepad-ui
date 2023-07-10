import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Item from "../Item";
import useGamepad from "../../hooks/useGamepad";

import "./index.css";
import { Item as ItemType } from "../../types/list";
import { smoothScrollToItem } from "../../utils/smoothScroll";
import { useFocus } from "../../contexts/FocusContext";
import { focusMatches } from "../../utils/focus";

type Props = {
  id?: string;
  items: ItemType[];
  type?: "horizontal" | "vertical";
  onItemConfirm?: (item: ItemType) => void;
};

const List = ({ items, type = "horizontal", onItemConfirm, id }: Props) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [isConfirmDown, setIsConfirmDown] = useState<boolean>(false);
  const { focus } = useFocus();

  const itemRefs = useRef<React.Ref<any>[]>([]);
  itemRefs.current = items.map(() => React.createRef());

  const isEnabled = useMemo(() => focusMatches(focus, id), [focus, id]);

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
    if (isConfirmDown && onItemConfirm) onItemConfirm(items[selectedItemIndex]);
  }, [isConfirmDown]);

  useGamepad(
    {
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
    },
    id
  );

  return (
    <div className={`list ${!isEnabled ? "disabled" : ""} ${type}`}>
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
