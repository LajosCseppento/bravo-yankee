import React from 'react';

import Sidebar from './Sidebar';
import TopBar from './TopBar';

export const TopBarAndSidebar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleDrawer = (open?: boolean) => (event: React.SyntheticEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setMobileOpen(open ?? !mobileOpen);
  };

  return (
    <>
      <TopBar toggleDrawer={toggleDrawer()} />
      <Sidebar mobileOpen={mobileOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default TopBarAndSidebar;
