import styled from "styled-components";
import { darkGreen, white } from "../../../utils/colors";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const RankingSection = styled.div`
  flex: 10;
  background-color: ${white};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const HeaderButtons = styled.div`
  padding-left: 0.5rem;
`;

export const SpaceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-left: 1rem;

  @media (max-width: 1200px) {
    padding-bottom: 0.5rem;
  }

  @media (max-width: 800px) {
    padding-bottom: 1rem;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;

  @media (max-width: 1200px) {
    padding-top: 0.5rem;
  }

  @media (max-width: 800px) {
    padding-top: 1rem;
  }
`;

export const H3 = styled.h3`
  color: ${darkGreen};
  padding: 0.01rem 0.5rem;
`;
