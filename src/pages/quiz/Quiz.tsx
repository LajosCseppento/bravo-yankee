import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React, {useEffect, useRef, useState} from 'react';

import PageTitle from '@app/components/PageTitle';
import phoneticAlphabet from '@app/model/phoneticAlphabet';
import shuffle from '@app/utils/shuffle';

import Special from './Special';

const newShuffle = () => shuffle([...phoneticAlphabet]);

const Quiz = () => {
  const [remaining, setRemaining] = useState(newShuffle());
  const [startTime, setStartTime] = useState(Date.now());
  const [finishTime, setFinishTime] = useState<number | undefined>(undefined);
  const [now, setNow] = useState(Date.now());
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>();

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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event || !remaining) {
      return;
    }

    const input = event.target.value.trim().toLowerCase();
    const current = remaining[0];

    setInput(input);

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

  const onSpecialReset = () => {
    setInput('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

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
            autoFocus
            inputRef={inputRef}
            onChange={onChange}
            sx={{fontSize: '3em', maxWidth: '5em'}}
          />
          <Box padding={1} sx={{display: 'inline', fontSize: '2em'}}>
            {remaining.length} left
          </Box>
        </>
      )}

      {remaining.length === 0 && (
        <Typography padding={1}>
          You are done! Great job!{' '}
          <Link href="#" onClick={reset}>
            Try again!
          </Link>
        </Typography>
      )}

      <Special input={input} current={current} reset={onSpecialReset} />
    </>
  );
};

export default Quiz;
