import React from "react";
import { black } from "../../utils/colors";

interface CheckIconProps {
  width: number;
  height: number;
  color?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({
  width,
  height,
  color = black,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 0C6.71571 0 0 6.71571 0 15C0 23.2843 6.71571 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71571 23.2843 0 15 0ZM15 2.90323C21.6854 2.90323 27.0968 8.31357 27.0968 15C27.0968 21.6854 21.6864 27.0968 15 27.0968C8.3146 27.0968 2.90323 21.6864 2.90323 15C2.90323 8.3146 8.31357 2.90323 15 2.90323ZM23.4801 10.7823L22.117 9.40821C21.8347 9.12363 21.3752 9.12175 21.0906 9.40409L12.5411 17.8849L8.92464 14.2391C8.64236 13.9545 8.1828 13.9527 7.89823 14.2349L6.52409 15.598C6.23952 15.8803 6.23764 16.3398 6.51998 16.6245L12.0108 22.1597C12.293 22.4443 12.7526 22.4462 13.0372 22.1638L23.476 11.8088C23.7605 11.5264 23.7624 11.0669 23.4801 10.7823Z"
        fill={color}
      />
    </svg>
  );
};

export default CheckIcon;
