import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CloseOutlined from '@material-ui/icons/CloseOutlined';
import Divider from '@material-ui/core/Divider';

import { path } from 'routers/path';

import Link from 'components/Link';
import Img from 'components/Img';

import Logo from 'assets/images/logo.png';

const useStyles = makeStyles(theme => ({
  wrapper: {},
  list: {
    width: 250,
    flex: 1,
    overflow: 'auto',
  },
  header: {
    height: 104,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: 'auto',
    height: 25,
  },
  item: {
    color: theme.palette.grey[900],
    textTransform: 'uppercase',
    fontFamily: theme.typography.fontMedium,
    '&:hover': {
      color: '#ffffff',
      backgroundColor: theme.palette.primary.main,
    },
    '&.active': {
      color: '#ffffff',
      backgroundColor: theme.palette.primary.main,
    },
  },
  subItem: {
    paddingLeft: theme.spacing(8),
    color: theme.palette.grey[900],
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '&:hover > ': {
      color: theme.palette.primary.main,
    },
  },
  action: {
    right: theme.spacing(1),
  },
  button: {
    padding: theme.spacing(2),
    zIndex: 1,
  },
  btnClose: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  becomeSalonManager: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function ListItemLink(props) {
  return <ListItem component={Link} {...props} />;
}

function DrawerMenu(props) {
  const { open, onClose, items } = props;
  const classes = useStyles();
  const [collapseIndex, setCollapseIndex] = useState();

  return (
    <Drawer open={open} onClose={onClose}>
      <div className={classes.header}>
        <IconButton onClick={onClose} className={classes.btnClose}>
          <CloseOutlined />
        </IconButton>
        <Img src={Logo} className={classes.logo} resizeMode="contain" />
      </div>
      <Divider />
      <List className={classes.list}>
        {items.map((item, index) => (
          <React.Fragment key={shortid.generate()}>
            <ListItemLink
              to={item.url}
              exact={item.url === '/'}
              className={classes.item}
              target={item.targetBlank ? '_blank' : undefined}
            >
              <ListItemText primary={item.name} />
              {item.sub && (
                <ListItemSecondaryAction className={classes.action}>
                  {collapseIndex === index ? (
                    <IconButton
                      className={classes.button}
                      onClick={() => setCollapseIndex()}
                    >
                      <ExpandLess />
                    </IconButton>
                  ) : (
                    <IconButton
                      className={classes.button}
                      onClick={() => setCollapseIndex(index)}
                    >
                      <ExpandMore />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              )}
            </ListItemLink>
            {item.sub && (
              <Collapse
                in={collapseIndex === index}
                timeout="auto"
                unmountOnExit
              >
                <List component="div">
                  {item.sub.map(child => (
                    <ListItemLink
                      key={shortid.generate()}
                      className={classes.subItem}
                      to={child.url}
                      exact={child.url === '/'}
                    >
                      {child.name}
                    </ListItemLink>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
        <ListItemLink
          to={path.becomeSalonManager}
          exact={path.becomeSalonManager === '/'}
          className={`${classes.item} ${classes.becomeSalonManager}`}
        >
          <ListItemText primary="Đăng ký chủ Salon" />
        </ListItemLink>
      </List>
    </Drawer>
  );
}

DrawerMenu.defaultProps = {
  items: [],
};

DrawerMenu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  items: PropTypes.array,
};

export default memo(DrawerMenu);
