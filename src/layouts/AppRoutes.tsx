import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Route, Routes, useLocation} from 'react-router-dom';

import Learn from '@app/pages/Learn';
import Home from '@app/pages/home/Home';
import Quiz from '@app/pages/Quiz';

import ErrorFallback from './ErrorFallback';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[location.key]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/Learn" element={<Learn />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
