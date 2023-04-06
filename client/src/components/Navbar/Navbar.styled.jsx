import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0;
  border: 1px solid #000;
`;

export const NavbarLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  letter-spacing: 0.1rem;
`;

export const NavbarRedirectLinkWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid red;
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
