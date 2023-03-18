import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import CodeWord from '@app/model/CodeWord';

type Props = {
  codeWords: readonly CodeWord[];
};

const CodeWordStack = ({codeWords}: Props) => (
  <Stack alignItems="left" alignContent="left">
    {codeWords.map(codeWord => (
      <Typography
        key={codeWord.spelling}
        padding={1}
        sx={{
          textTransform: 'capitalize',
          '&::first-letter': {
            fontWeight: 'bold',
          },
        }}
      >
        {codeWord.spelling}
      </Typography>
    ))}
  </Stack>
);

export default CodeWordStack;
