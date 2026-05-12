import Grid from '@mui/material/Grid';

import CodeWord from '@app/model/CodeWord';

import CodeWordStack from './CodeWordStack';

type Props = {
  codeWords: readonly CodeWord[];
  columns: number;
};

const CodeWordGrid = ({codeWords, columns}: Props) => {
  const columnSize = Math.ceil(codeWords.length / columns);

  return (
    <Grid container columns={columns} sx={{maxWidth: 400}}>
      {Array.from(Array(columns)).map((_, columnIndex) => (
        <Grid size={1} key={columnIndex}>
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
