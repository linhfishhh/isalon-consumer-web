import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AskIcon from 'assets/svgIcon/AskIcon';
import AnswerIcon from 'assets/svgIcon/AnswerIcon';

function HelpItem(props) {
  const { data } = props;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const html = useMemo(
    () => ({
      __html: data.answer,
    }),
    [data],
  );

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <AskIcon />
        </ListItemIcon>
        <ListItemText primary={data.content} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemIcon>
              <AnswerIcon />
            </ListItemIcon>
            {/* <ListItemText primary={data.answer} /> */}
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={html}
            />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}

HelpItem.propTypes = {
  data: PropTypes.object,
};

export default memo(HelpItem);
