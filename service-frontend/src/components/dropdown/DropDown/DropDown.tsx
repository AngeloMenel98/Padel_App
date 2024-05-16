import React, { useState } from "react";
import DropDownButton from "../DropDownButton/DropDownButton";
import DropDownContent from "../DropDownContent/DropDownContent";
import {
  ButtonContainer,
  Container,
  ContentContainer,
  Label,
} from "./DropDownStyle";
import DropDownItem from "../DropDownItem/DropDownItem";

interface DropDownProps<T extends string | number | boolean> {
  buttonText: React.ReactNode;
  items: T[];
  width: number;
  onChange: (selectedItems: T[]) => void;
}

const DropDown = <T extends string | number | boolean>({
  buttonText,
  items,
  width,
  onChange,
}: DropDownProps<T>) => {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  const toggleDropDown = () => {
    setOpen((open) => !open);
  };

  const handleItemClick = (item: T) => {
    setSelectedItems((prevItems) => {
      const newSelectedItems = prevItems.includes(item)
        ? prevItems.filter((selectedItem) => selectedItem !== item)
        : [...prevItems, item];

      onChange(newSelectedItems);

      return newSelectedItems;
    });
  };

  const truncateItems =
    selectedItems.join(", ").length > 12
      ? selectedItems.join(", ").slice(0, 12) + "..."
      : selectedItems.join(", ");

  return (
    <Container>
      <ButtonContainer>
        <Label>{buttonText}</Label>
        <DropDownButton open={open} toggle={toggleDropDown} width={width}>
          {truncateItems}
        </DropDownButton>
      </ButtonContainer>

      <ContentContainer>
        <DropDownContent open={open} width={width}>
          {items.map((item, index) => (
            <DropDownItem
              key={index}
              onClick={() => handleItemClick(item)}
              selected={selectedItems.includes(item)}
              width={width}
            >
              {item.toString()}
            </DropDownItem>
          ))}
        </DropDownContent>
      </ContentContainer>
    </Container>
  );
};

export default DropDown;
