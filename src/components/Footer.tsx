// Footer.js
import styled from 'styled-components';
const FooterContainer = styled.footer`
  background-color: #333;
  color:#fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adjust the values as needed */
  padding: 10px;
  text-align: center;
`;

const CopyrightText = styled.p`
  margin: 0;
  font-size:18px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <CopyrightText>&copy; 2023 Your Company Name</CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
