import {styled} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import phoneticAlphabet from 'model/PhoneticAlphabet';
import React, {useState} from 'react';

import PageTitle from '@app/components/PageTitle';

const StyledButton = styled(Button)({
  fontSize: '1em',
});

const Learn = () => {
  const [index, setIndex] = useState(0);

  const previous = () => {
    setIndex(
      prev => (prev - 1 + phoneticAlphabet.length) % phoneticAlphabet.length
    );
  };

  const random = () => {
    setIndex(Math.floor(Math.random() * phoneticAlphabet.length));
  };

  const next = () => {
    setIndex(prev => (prev + 1) % phoneticAlphabet.length);
  };

  const current = phoneticAlphabet[index];

  return (
    <>
      <PageTitle value="Learn" />
      <Typography
        sx={{
          fontSize: '3em',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
        padding={1}
      >
        {current.letter} = {current.spelling}
      </Typography>
      <StyledButton onClick={previous}>Previous</StyledButton>
      <StyledButton onClick={random}>Random</StyledButton>
      <StyledButton onClick={next}>Next</StyledButton>
    </>
  );
};

export default Learn;
