import React, { useState, useCallback } from "react";
import List from "../List";
import { Item } from "../../types/list";
import useGamepad from "../../hooks/useGamepad";
import { useFocus } from "../../contexts/FocusContext";

type DropdownProps = {
  items: Item[];
  type?: "horizontal" | "vertical";
  onChange?: (item: Item) => void;
  value?: Item;
  id?: string;
};

const Dropdown = ({ items, type, onChange, value, id }: DropdownProps) => {
  const { setFocus } = useFocus();
  const [isOpen, setIsOpen] = useState(false);

  const handleItemConfirm = useCallback(
    (item: Item) => {
      setIsOpen(false);
      setFocus(id || null);
      if (onChange) {
        onChange(item);
      }
    },
    [onChange]
  );

  useGamepad(
    {
      onConfirm: {
        onPress: () => {
          setIsOpen(!isOpen);
          setFocus(id + "-list");
        },
      },
    },
    id
  );

  return (
    <div>
      {value?.id || "Select an option"}
      {isOpen && (
        <List
          items={items}
          type={type}
          onItemConfirm={handleItemConfirm}
          id={id + "-list"}
        />
      )}
    </div>
  );
};

export default Dropdown;
