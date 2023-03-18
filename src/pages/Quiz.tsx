import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, {useEffect, useRef, useState} from 'react';

import PageTitle from '@app/components/PageTitle';
import CodeWord from '@app/model/CodeWord';
import phoneticAlphabet from '@app/model/phoneticAlphabet';
import shuffle from '@app/utils/shuffle';

const newShuffle = () => shuffle([...phoneticAlphabet]);

const Quiz = () => {
  const [remaining, setRemaining] = useState(newShuffle());
  const [startTime, setStartTime] = useState(Date.now());
  const [finishTime, setFinishTime] = useState<number | undefined>(undefined);
  const [now, setNow] = useState(Date.now());
  const [special, setSpecial] = useState<JSX.Element | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const resetSpecial = () => setSpecial(null);

  const videoSpecial = (source: JSX.Element) => (
    <>
      <Box sx={{textAlign: 'center'}}>
        <video ref={videoRef} width="75%" height="auto" controls autoPlay muted>
          {source}
          Cannot play the video. Sorry.
        </video>
      </Box>
      <Stack direction="row" alignSelf="center">
        <Button
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.fastSeek(0);
              videoRef.current.play();
            }
          }}
        >
          Again!
        </Button>
        <Button
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 1.0;
            }
          }}
        >
          With sound!
        </Button>
        <Button color="error" onClick={resetSpecial}>
          Close
        </Button>
      </Stack>
    </>
  );

  const handleSpecial = (input: string, current: CodeWord) => {
    if (current.letter === 'r' && input === 'rosie') {
      setSpecial(
        <Stack>
          <Typography sx={{fontSize: '2em'}}>Rosie is the best! 🐣</Typography>
          <Typography variant="body2" sx={{fontStyle: 'italic'}}>
            ... but the correct answer is Romeo
          </Typography>
          <Button color="error" onClick={resetSpecial}>
            Close
          </Button>
        </Stack>
      );
    } else if (current.letter === 'k') {
      if (input === 'kiwi') {
        setSpecial(
          videoSpecial(<source src="/static/video/kiwi.mp4" type="video/mp4" />)
        );
      } else if (input === 'koala') {
        setSpecial(
          videoSpecial(
            <source src="/static/video/koala.mp4" type="video/mp4" />
          )
        );
      }
    }
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event || !remaining) {
      return;
    }

    const input = event.target.value.trim().toLowerCase();
    const current = remaining[0];

    handleSpecial(input, current);

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
        <Typography padding={1}>
          You are done! Great job!{' '}
          <Link href="#" onClick={reset}>
            Try again!
          </Link>
        </Typography>
      )}

      {special && (
        <Backdrop
          sx={{
            color: '#fff',
            backgroundColor: '#000000dd',
            zIndex: theme => theme.zIndex.drawer + 1,
          }}
          open={special !== null}
        >
          <Stack>{special}</Stack>
        </Backdrop>
      )}
    </>
  );
};

export default Quiz;
