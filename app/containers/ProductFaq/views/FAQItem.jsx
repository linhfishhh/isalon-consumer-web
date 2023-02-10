import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Divider } from '@material-ui/core';
import AskIcon from 'assets/svgIcon/AskIcon';
import AnswerIcon from 'assets/svgIcon/AnswerIcon';
import get from 'lodash/get';
import { toDate } from 'date-fns-tz';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import vi from 'date-fns/locale/vi';
import useStyles from '../styles';

function FAQItem(props) {
  const classes = useStyles();
  const { data } = props;

  const answerDate = useMemo(() => {
    const commentDateStr = get(data, 'answerAt');
    if (commentDateStr) {
      const d = toDate(commentDateStr, { timeZone: 'UTC' });
      return formatDistanceToNow(d, { locale: vi, addSuffix: true });
    }
    return '';
  }, [data]);

  return (
    <div className={classes.faqItemContainer}>
      <Grid container>
        <Grid item className={classes.faqIcon}>
          <AskIcon />
        </Grid>
        <Grid item xs>
          <Typography className={classes.faqAskText}>
            {get(data, 'question', '')}
          </Typography>
        </Grid>
      </Grid>
      {data && data.answer && (
        <Grid container>
          <Grid item className={classes.faqIcon}>
            <AnswerIcon />
          </Grid>
          <Grid item xs>
            <Grid container direction="column">
              <Grid item>
                <Typography display="inline">
                  {get(data, 'answer', '')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  display="inline"
                  className={classes.faqAnswerText}
                >{`iSalon trả lời vào ${answerDate}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Divider className={classes.faqItemDivier} />
    </div>
  );
}

FAQItem.propTypes = {
  data: PropTypes.object,
};

export default memo(FAQItem);
