// Preloader.js
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const PreloaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 128, 0, 0.1); /* Green border */
  border-top: 4px solid #00ff00; /* Green top */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 0.8s linear infinite;
`;

const Preloader = () => {
  return (
    <PreloaderWrapper>
      <Spinner />
    </PreloaderWrapper>
  );
};

export default Preloader;
