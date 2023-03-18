import Typography from '@mui/material/Typography';
import React from 'react';

export default function Footer() {
  return (
    <Typography variant="body2" width="100%" alignItems="center">
      {process.env.REACT_APP_PACKAGE_NAME}{' '}
      {process.env.REACT_APP_PACKAGE_VERSION} - Built with React, MUI and ❤️
    </Typography>
  );
}
