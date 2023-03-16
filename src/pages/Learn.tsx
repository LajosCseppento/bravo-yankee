import React, {useState} from 'react';
import {phoneticAlphabet} from 'model';
import PageTitle from '@app/components/PageTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material';

const StyledButton = styled(Button)({
  fontSize: '1em',
});

const codeWords = Array.from(phoneticAlphabet.keys());

const Learn = () => {
  const [index, setIndex] = useState(0);

  const previous = () => {
    setIndex(prev => (prev - 1 + codeWords.length) % codeWords.length);
  };

  const random = () => {
    setIndex(Math.floor(Math.random() * codeWords.length));
  };

  const next = () => {
    setIndex(prev => (prev + 1) % codeWords.length);
  };

  const current = codeWords[index];

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
        {current[0]} = {current}
      </Typography>
      <StyledButton onClick={previous}>Previous</StyledButton>
      <StyledButton onClick={random}>Random</StyledButton>
      <StyledButton onClick={next}>Next</StyledButton>
    </>
  );
};

export default Learn;
