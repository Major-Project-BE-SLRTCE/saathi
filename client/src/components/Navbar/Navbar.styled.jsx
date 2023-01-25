import styled from "styled-components";
import { Link } from "react-router-dom";
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  position: sticky;
  top: 0;
`;

export const NavbarLink = styled(Link)`
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

export const NavbarRedirectLink = styled(Link)`
  margin: auto 12px;
  padding: 8px 16px;
  color: #007bff;
  text-decoration: none;
  border: 1px solid #007bff;
  border-radius: 5px;
  transition: all 200ms;
  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;
