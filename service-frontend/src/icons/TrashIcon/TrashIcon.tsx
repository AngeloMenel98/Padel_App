import React from "react";
import { black } from "../../utils/colors";

interface TrashIconProps {
  width: number;
  height: number;
  color?: string;
}

const TrashIcon: React.FC<TrashIconProps> = ({
  width,
  height,
  color = black,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 27 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.7031 24.375H17.1094C17.2959 24.375 17.4747 24.3009 17.6066 24.1691C17.7384 24.0372 17.8125 23.8584 17.8125 23.6719V11.0156C17.8125 10.8291 17.7384 10.6503 17.6066 10.5184C17.4747 10.3866 17.2959 10.3125 17.1094 10.3125H15.7031C15.5166 10.3125 15.3378 10.3866 15.2059 10.5184C15.0741 10.6503 15 10.8291 15 11.0156V23.6719C15 23.8584 15.0741 24.0372 15.2059 24.1691C15.3378 24.3009 15.5166 24.375 15.7031 24.375ZM25.3125 4.6875H20.4838L18.4916 1.36523C18.2416 0.948642 17.8879 0.603921 17.4651 0.364662C17.0422 0.125404 16.5646 -0.000231058 16.0787 3.19011e-07H10.1713C9.68563 -2.86388e-05 9.20824 0.125702 8.7856 0.364951C8.36297 0.6042 8.00948 0.948812 7.75957 1.36523L5.76621 4.6875H0.9375C0.68886 4.6875 0.450403 4.78627 0.274587 4.96209C0.0987721 5.1379 0 5.37636 0 5.625L0 6.5625C0 6.81114 0.0987721 7.0496 0.274587 7.22541C0.450403 7.40123 0.68886 7.5 0.9375 7.5H1.875V27.1875C1.875 27.9334 2.17132 28.6488 2.69876 29.1762C3.22621 29.7037 3.94158 30 4.6875 30H21.5625C22.3084 30 23.0238 29.7037 23.5512 29.1762C24.0787 28.6488 24.375 27.9334 24.375 27.1875V7.5H25.3125C25.5611 7.5 25.7996 7.40123 25.9754 7.22541C26.1512 7.0496 26.25 6.81114 26.25 6.5625V5.625C26.25 5.37636 26.1512 5.1379 25.9754 4.96209C25.7996 4.78627 25.5611 4.6875 25.3125 4.6875ZM10.0687 2.98301C10.1001 2.93085 10.1444 2.88773 10.1974 2.85784C10.2504 2.82795 10.3103 2.81233 10.3711 2.8125H15.8789C15.9396 2.81243 15.9994 2.8281 16.0523 2.85798C16.1051 2.88787 16.1494 2.93094 16.1807 2.98301L17.2037 4.6875H9.04629L10.0687 2.98301ZM21.5625 27.1875H4.6875V7.5H21.5625V27.1875ZM9.14062 24.375H10.5469C10.7334 24.375 10.9122 24.3009 11.0441 24.1691C11.1759 24.0372 11.25 23.8584 11.25 23.6719V11.0156C11.25 10.8291 11.1759 10.6503 11.0441 10.5184C10.9122 10.3866 10.7334 10.3125 10.5469 10.3125H9.14062C8.95414 10.3125 8.7753 10.3866 8.64344 10.5184C8.51158 10.6503 8.4375 10.8291 8.4375 11.0156V23.6719C8.4375 23.8584 8.51158 24.0372 8.64344 24.1691C8.7753 24.3009 8.95414 24.375 9.14062 24.375Z"
        fill={color}
      />
    </svg>
  );
};

export default TrashIcon;
