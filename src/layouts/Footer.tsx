import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function Footer() {
  return (
    <Typography variant="body2" width="100%" alignItems="center">
      {`${APP_PACKAGE_NAME} ${APP_PACKAGE_VERSION} by `}
      <Link href="https://lajoscseppento.dev" target="_blank" rel="noopener">
        Lajos Cs.
      </Link>
      {' - Built with React, MUI and ❤️'}
    </Typography>
  );
}
