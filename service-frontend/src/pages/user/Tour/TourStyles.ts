import styled from "styled-components";
import { darkGreen, white } from "../../../utils/colors";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const NavBarContainer = styled.div`
  flex: 1;
`;

export const TourSection = styled.div`
  flex: 10;
  background-color: ${white};
  width: 100%;
`;

export const ButtonInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ButtonContainer = styled.div`
  padding-top: 1rem;
  padding-left: 3rem;
  padding-right: 17rem;
`;

export const InputContainer = styled.div`
  padding-top: 1rem;
  padding-left: 35rem;
  padding-right: 5rem;
`;
export const H2 = styled.h2`
  color: ${darkGreen};
  padding: 0.01rem 3rem;
`;
