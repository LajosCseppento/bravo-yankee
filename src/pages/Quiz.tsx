import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React, {useEffect, useState} from 'react';

import PageTitle from '@app/components/PageTitle';
import phoneticAlphabet from '@app/model/PhoneticAlphabet';
import shuffle from '@app/utils/shuffle';

const newShuffle = () => shuffle([...phoneticAlphabet]);

const Quiz = () => {
  const [remaining, setRemaining] = useState(newShuffle());
  const [startTime, setStartTime] = useState(Date.now());
  const [finishTime, setFinishTime] = useState<number | undefined>(undefined);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const reset = () => {
    setRemaining(newShuffle());
    setStartTime(Date.now());
    setFinishTime(undefined);
    setNow(Date.now());
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event || !remaining) {
      return;
    }

    const input = event.target.value.trim().toLowerCase();
    const current = remaining[0];

    if (
      current.spelling === input ||
      current.alternativeSpellings.includes(input)
    ) {
      event.target.value = '';
      setRemaining(prev => prev.slice(1));
    }
  };

  if (remaining.length === 0 && !finishTime) {
    setFinishTime(Date.now());
  }

  const elapsed = Math.floor(((finishTime ?? now) - startTime) / 1000);
  const elapsedMinutes = Math.floor(elapsed / 60)
    .toString()
    .padStart(2, '0');
  const elapsedSeconds = Math.floor(elapsed % 60)
    .toString()
    .padStart(2, '0');

  const current = remaining[0];

  return (
    <>
      <PageTitle value={`Quiz - ${elapsedMinutes}:${elapsedSeconds}`} />
      {remaining.length > 0 && (
        <>
          <Typography
            sx={{
              display: 'inline',
              fontSize: '3em',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
            padding={1}
          >
            {`${current.letter} = `}
          </Typography>
          <Input
            inputRef={input => input && input.focus()}
            onChange={change}
            sx={{
              fontSize: '3em',
              maxWidth: '5em',
            }}
          />
          <Box
            padding={1}
            sx={{
              display: 'inline',
              fontSize: '2em',
            }}
          >
            {remaining.length} left
          </Box>
        </>
      )}
      {remaining.length === 0 && (
        <>
          <Typography padding={1}>
            You are done! Great job!{' '}
            <Link href="#" onClick={reset}>
              Try again!
            </Link>
          </Typography>
        </>
      )}
    </>
  );
};

export default Quiz;
