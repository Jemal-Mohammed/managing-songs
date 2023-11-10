import React, { FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled.div`
  position: relative;
  height: 400px; /* Set the desired height */
  background: url('hero2.jpg') center/cover no-repeat; /* Replace with your image URL */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchFormOverlay = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.9); /* Adjust the opacity as needed */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adjust the values as needed */
  color: black; /* Change to black for better visibility */
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 50%;
`;

const SearchHeading = styled.h1`
  color: green;
  padding-bottom: 15px;
`;

const StyledForm = styled.form`
  padding-bottom: 20px;
  display: flex;
  flex-direction: row; /* Changed from column to row */
  align-items: center;

  input {
    flex: 1; /* Take up remaining space */
    padding: 10px;
    margin-right: 10px; /* Add spacing between input and button */
    border: 1px solid #fff;
    border-radius: 8px;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
`;

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Perform any action with the searchValue if needed
    // console.log('Search value:', searchValue);
    
    // Navigate to a different page with the searchValue as a parameter
    navigate(`/search-results/${searchValue}`);
  };

  return (
    <HeroContainer>
      <SearchFormOverlay>
        <SearchHeading>Search Songs</SearchHeading>
        {/* Your search form goes here */}
        <StyledForm onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search songs"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit">Submit</button>
        </StyledForm>
      </SearchFormOverlay>
    </HeroContainer>
  );
};

export default Hero;
