import React from "react";
import { white } from "../../utils/colors";
<<<<<<< HEAD

interface MenuIconProps {
  width: number;
  height: number;
  color?: string;
  onClick?: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({
=======
import { IconProps } from "../../utils/interfaces";

const MenuIcon: React.FC<IconProps> = ({
>>>>>>> develop
  width,
  height,
  onClick,
  color = white,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 66 67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <path
        d="M8.25 22.3333H57.75C58.4793 22.3333 59.1788 22.0392 59.6945 21.5157C60.2103 20.9921 60.5 20.2821 60.5 19.5417C60.5 18.8013 60.2103 18.0912 59.6945 17.5677C59.1788 17.0441 58.4793 16.75 57.75 16.75H8.25C7.52065 16.75 6.82118 17.0441 6.30546 17.5677C5.78973 18.0912 5.5 18.8013 5.5 19.5417C5.5 20.2821 5.78973 20.9921 6.30546 21.5157C6.82118 22.0392 7.52065 22.3333 8.25 22.3333ZM57.75 44.6667H8.25C7.52065 44.6667 6.82118 44.9608 6.30546 45.4843C5.78973 46.0079 5.5 46.7179 5.5 47.4583C5.5 48.1987 5.78973 48.9088 6.30546 49.4323C6.82118 49.9559 7.52065 50.25 8.25 50.25H57.75C58.4793 50.25 59.1788 49.9559 59.6945 49.4323C60.2103 48.9088 60.5 48.1987 60.5 47.4583C60.5 46.7179 60.2103 46.0079 59.6945 45.4843C59.1788 44.9608 58.4793 44.6667 57.75 44.6667ZM57.75 30.7083H8.25C7.52065 30.7083 6.82118 31.0025 6.30546 31.526C5.78973 32.0495 5.5 32.7596 5.5 33.5C5.5 34.2404 5.78973 34.9505 6.30546 35.474C6.82118 35.9975 7.52065 36.2917 8.25 36.2917H57.75C58.4793 36.2917 59.1788 35.9975 59.6945 35.474C60.2103 34.9505 60.5 34.2404 60.5 33.5C60.5 32.7596 60.2103 32.0495 59.6945 31.526C59.1788 31.0025 58.4793 30.7083 57.75 30.7083Z"
        fill={color}
      />
    </svg>
  );
};

export default MenuIcon;
