import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar as MuiToolbar, Typography } from '@material-ui/core';
import { injectIntl, intlShape } from 'react-intl';

import messages from './messages';

function Toolbar(props) {
  const { intl, name, numSelected, actions, options } = props;
  return (
    <MuiToolbar variant="regular">
      {(name || numSelected > 0) && (
        <>
          <Typography variant="h6">{name}</Typography>
          {options.showTextRowsSelected && options.multipleSelection && (
            <Typography variant="subtitle1">
              {numSelected > 0
                ? `${numSelected} ${intl.formatMessage(messages.selected)}`
                : ' '}
            </Typography>
          )}
        </>
      )}
      {actions && actions.map(action => action)}
    </MuiToolbar>
  );
}
Toolbar.propTypes = {
  intl: intlShape,
  name: PropTypes.string,
  numSelected: PropTypes.number,
  actions: PropTypes.arrayOf(PropTypes.element),
  options: PropTypes.object,
};

export default injectIntl(Toolbar);
