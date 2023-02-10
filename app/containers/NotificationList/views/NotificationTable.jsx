import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import EmptyPage from 'components/EmptyPage';
import NotificationItem from './NotificationItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(4),
  },
  table: {},
  tableWrapper: {
    overflowX: 'auto',
  },
}));

function NotificationTable(props) {
  const classes = useStyles();

  const { data = [], onRead, onDelete, onDetail } = props;

  return (
    <div className={classes.root}>
      <Grid container className={classes.table} direction="column">
        {isEmpty(data) ? (
          <EmptyPage
            title="Không có thông báo"
            subTitle="Bạn chưa có thông báo nào, khi nào có chúng sẽ hiển thị tại đây"
          />
        ) : (
          data.map((row, index) => (
            <NotificationItem
              data={row}
              onRead={onRead}
              onDelete={onDelete}
              onDetail={onDetail}
              key={row.id || index}
            />
          ))
        )}
      </Grid>
    </div>
  );
}

NotificationTable.propTypes = {
  data: PropTypes.array,
  onRead: PropTypes.func,
  onDelete: PropTypes.func,
  onDetail: PropTypes.func,
};

export default memo(NotificationTable);
