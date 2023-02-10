import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button as MuiButton,
  IconButton as MuiIconButton,
  Badge,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Close as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle as AgreeIcon,
  FileCopy as CopyIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  ListAlt as DetailIcon,
  Menu as MenuIcon,
  Reply as ReplyIcon,
  Remove as RemoveIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
} from '@material-ui/icons';

import { useIntl } from 'react-intl';
import { spacing } from '@material-ui/system';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { BellIcon, BookingIcon, CartIcon, UserIcon } from 'assets/svgIcon';

import messages from './messages';

const NewButton = styled(MuiButton)(spacing);
const NewIconButton = styled(MuiIconButton)(spacing);

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  badge: {
    border: `2px solid ${theme.palette.borderColor[2]}`,
  },
}));

const MyBadge = withStyles(theme => ({
  badge: {
    color: theme.palette.textColor[6],
    backgroundColor: theme.palette.badgeColor,
    right: -10,
    border: `2px solid ${theme.palette.borderColor[2]}`,
    padding: '0 4px',
  },
}))(Badge);

const optionsDefault = { showIcon: false };

const iconList = {
  add: AddIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  upload: CloudUploadIcon,
  save: SaveIcon,
  cancel: CancelIcon,
  agree: AgreeIcon,
  copy: CopyIcon,
  clean: ClearIcon,
  close: CloseIcon,
  detail: DetailIcon,
  menu: MenuIcon,
  reply: ReplyIcon,
  notification: BellIcon,
  booking: BookingIcon,
  cart: CartIcon,
  user: UserIcon,
  increment: AddIcon,
  decrement: RemoveIcon,
  prev: PrevIcon,
  next: NextIcon,
};

function Button(props) {
  const {
    name,
    icon,
    action,
    type,
    fontSize,
    options,
    href,
    badgeNumber,
    ...ref
  } = props;

  const classes = useStyles();
  const intl = useIntl();

  const fullOptions = { ...optionsDefault, ...options };

  const iconRender = () => {
    const Icon = iconList[icon];
    if (Icon) {
      if (type === 'iconButton') {
        return <Icon fontSize={fontSize} color={fullOptions.iconColor} />;
      }
      return (
        <>
          {fullOptions.showIcon && (
            <Icon
              fontSize={fontSize}
              className={classes.leftIcon}
              color={fullOptions.iconColor}
            />
          )}
          {name || intl.formatMessage(messages[icon])}
        </>
      );
    }
    return name;
  };

  return (
    <>
      {type === 'iconButton' ? (
        <NewIconButton onClick={action} {...ref}>
          <MyBadge badgeContent={badgeNumber}>{iconRender()}</MyBadge>
        </NewIconButton>
      ) : (
        <NewButton
          mr={2}
          variant="contained"
          color="primary"
          onClick={action}
          {...ref}
        >
          <MyBadge badgeContent={badgeNumber}>{iconRender()}</MyBadge>
        </NewButton>
      )}
    </>
  );
}

Button.propTypes = {
  name: PropTypes.string,
  action: PropTypes.func,
  icon: PropTypes.oneOf([
    'add',
    'edit',
    'delete',
    'upload',
    'save',
    'cancel',
    'agree',
    'copy',
    'clean',
    'close',
    'detail',
    'signOut',
    'menu',
    'option',
    'reply',
    'notification',
    'booking',
    'cart',
    'user',
    'decrement',
    'increment',
    'next',
    'prev',
  ]),
  type: PropTypes.oneOf(['default', 'iconButton']),
  fontSize: PropTypes.oneOf(['default', 'small', 'large']),
  options: PropTypes.object,
  href: PropTypes.string,
  badgeNumber: PropTypes.number,
};

export default memo(Button);
