import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EmptyPage from 'components/EmptyPage';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const Empty = props => {
  const { colSpan, className, title, subTitle, emptyIcon } = props;

  return (
    <TableRow>
      <TableCell align="center" colSpan={colSpan}>
        <EmptyPage
          className={className}
          title={title}
          subTitle={subTitle}
          emptyIcon={emptyIcon}
        />
      </TableCell>
    </TableRow>
  );
};

Empty.propTypes = {
  colSpan: PropTypes.number,
  className: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  emptyIcon: PropTypes.string,
};

export default memo(Empty);
