import React from 'react';

import Typography from '@mui/material/Typography';
import PageTitle from '@app/components/PageTitle';
import {phoneticAlphabet} from 'model';
import Box from '@mui/material/Box';
import CodeWordGrid from './CodeWordGrid';

const codeWords = Array.from(phoneticAlphabet.keys());

const Home = () => (
  <>
    <PageTitle value="Home" />
    <Typography padding={1}>
      Whiskey Echo Lima Charlie Oscar Mike Echo! Welcome!
    </Typography>
    <Typography padding={1}>
      Refer to the table below or check out the menu for some games!
    </Typography>

    <Box sx={{display: {xs: 'block', sm: 'none'}}}>
      <CodeWordGrid codeWords={codeWords} columns={2} />
    </Box>

    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
      <CodeWordGrid codeWords={codeWords} columns={4} />
    </Box>
  </>
);

export default Home;
