import styled from '@emotion/styled';
import { space, layout, color } from 'styled-system';
import { FaMusic } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  ${space}
  ${layout}
  ${color}
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: red;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: green;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 1rem;
  &:hover {
    color: blue;
  }
  ${space}
  ${color}

  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin: 0 0.5rem;
  }
`;

const AddButton = styled.button`
  background-color: #00ffbf;
  color: white;
  border: none;
  border-radius: 5%;
  padding: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00e6cc;
  }

  @media (max-width: 600px) {
    font-size: 1.2rem;
    padding: 8px;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>
        <FaMusic />
      </Logo>
      <div>
        <StyledLink to="/" {...{ ml: 2 }}>
          All Songs
        </StyledLink>
        <StyledLink to="/statistics" {...{ ml: 2 }}>
          Statistics
        </StyledLink>
        <StyledLink to="/add-songs" {...{ ml: 2 }}>
          <AddButton>
            Add song
          </AddButton>
        </StyledLink>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
