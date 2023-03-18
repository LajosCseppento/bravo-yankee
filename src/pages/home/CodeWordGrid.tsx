import Grid from '@mui/material/Grid';
import CodeWord from 'model/CodeWord';
import React from 'react';

import CodeWordStack from './CodeWordStack';

type Props = {
  codeWords: readonly CodeWord[];
  columns: number;
};

const CodeWordGrid = ({codeWords, columns}: Props) => {
  const columnSize = Math.ceil(codeWords.length / columns);

  return (
    <Grid container columns={columns} maxWidth={400}>
      {Array.from(Array(columns)).map((_, columnIndex) => (
        <Grid item xs={1} key={columnIndex}>
          <CodeWordStack
            codeWords={codeWords.slice(
              columnIndex * columnSize,
              (columnIndex + 1) * columnSize
            )}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CodeWordGrid;
