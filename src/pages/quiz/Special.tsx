import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, {useRef} from 'react';

import CodeWord from '@app/model/CodeWord';

type Props = {
  current: CodeWord | undefined;
  input: string;
  reset: () => void;
};

const Special = ({current, input, reset}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const unmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
    }
  };

  const closeButton = (
    <Button color="error" onClick={reset}>
      Close
    </Button>
  );

  const createVideo = (source: JSX.Element) => (
    <>
      <Box sx={{textAlign: 'center'}}>
        <video ref={videoRef} width="75%" height="auto" controls autoPlay muted>
          {source}
          Cannot play the video. Sorry.
        </video>
      </Box>
      <Stack direction="row" alignSelf="center">
        <Button onClick={restart}>Again!</Button>
        <Button onClick={unmute}>With sound!</Button>
        {closeButton}
      </Stack>
    </>
  );

  let content: JSX.Element | null = null;
  if (current?.letter === 'r' && input === 'rosie') {
    content = (
      <Stack>
        <Typography sx={{fontSize: '2em'}}>Rosie is the best! 🐣</Typography>
        <Typography variant="body2" sx={{fontStyle: 'italic'}}>
          ... but the correct answer is Romeo
        </Typography>
        {closeButton}
      </Stack>
    );
  } else if (current?.letter === 'k') {
    if (input === 'kiwi') {
      content = createVideo(
        <source src="/static/video/kiwi.mp4" type="video/mp4" />
      );
    } else if (input === 'koala') {
      content = createVideo(
        <source src="/static/video/koala.mp4" type="video/mp4" />
      );
    }
  }

  return (
    <>
      {content && (
        <Backdrop
          sx={{
            color: '#fff',
            backgroundColor: '#000000dd',
            zIndex: theme => theme.zIndex.drawer + 1,
          }}
          open={content !== null}
        >
          <Stack>{content}</Stack>
        </Backdrop>
      )}
    </>
  );
};

export default Special;
