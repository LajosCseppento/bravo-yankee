import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {type ReactNode} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';

type SidebarItem = {
  title: string;
  path: string;
  icon: ReactNode;
  secondaryAction?: ReactNode;
};

const items: SidebarItem[][] = [
  [
    {title: 'Home', path: '/', icon: <HomeIcon />},
    {title: 'Learn', path: '/learn', icon: <SchoolIcon />},
    {title: 'Quiz', path: '/quiz', icon: <QuizIcon />},
  ],
];

const SidebarMenu = () => {
  const location = useLocation();

  return (
    <>
      {items.map((itemGroup, index) => (
        <span key={'group_' + index}>
          <Divider />
          <List>
            {itemGroup.map(item => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  selected={item.path === location.pathname}
                  component={RouterLink}
                  to={item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </span>
      ))}

      <Divider />

      <List>
        <ListItem key="source-code" disablePadding>
          <ListItemButton
            component={Link}
            href="https://github.com/LajosCseppento/bravo-yankee"
            target="_blank"
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary="Source Code" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default SidebarMenu;
