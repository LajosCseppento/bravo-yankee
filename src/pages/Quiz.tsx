import React, {useEffect, useState} from 'react';
import {phoneticAlphabet} from 'model';
import PageTitle from '@app/components/PageTitle';
import shuffle from '@app/utils/shuffle';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const newShuffle = () => shuffle(Array.from(phoneticAlphabet.entries()));

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

    if (current[0] === input || current[1].includes(input)) {
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
            {remaining[0][0][0]} ={' '}
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
