import React from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

type Props = {
  codeWords: string[];
};

const CodeWordStack = ({codeWords}: Props) => (
  <Stack alignItems="left" alignContent="left">
    {codeWords.map(codeWord => (
      <Typography
        key={codeWord}
        padding={1}
        sx={{
          textTransform: 'capitalize',
          '&::first-letter': {
            fontWeight: 'bold',
          },
        }}
      >
        {codeWord}
      </Typography>
    ))}
  </Stack>
);

export default CodeWordStack;
