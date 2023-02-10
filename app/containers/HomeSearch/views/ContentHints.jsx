/**
 *
 * ContentHints
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ListItem from '@material-ui/core/ListItem';

import { path, createPath } from 'routers/path';

import { convertToSlug } from 'utils/stringFormat';

import ServiceHintItem from './ServiceHintItem';
import SalonHintItem from './SalonHintItem';

const useStyles = makeStyles(theme => ({
  catsSection: {
    padding: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
    },
  },
}));

function ContentHints(props) {
  const { section, onClick } = props;
  const classes = useStyles();

  const handleOnClick = (item, type) => {
    let link = '';
    if (type === 'category') {
      link = `${path.bookingSearch}?cat[]=${item.id}`;
    } else if (type === 'service') {
      const { salon } = item;
      if (salon) {
        const newPath = createPath(path.salonDetail, {
          salonId: `${salon.id}`,
          salonName: convertToSlug(salon.name),
          provinceName: convertToSlug(salon.location_name),
        });
        link = `${newPath}?service=${item.id}`;
      }
    } else if (type === 'salon') {
      link = createPath(path.salonDetail, {
        salonId: `${item.id}`,
        salonName: convertToSlug(item.name),
        provinceName: convertToSlug(item.location_name),
      });
    }
    if (!isEmpty(link)) {
      onClick(link);
    }
  };

  return (
    <>
      {section.type === 'category' && (
        <ListItem key={shortid.generate()} className={classes.catsSection}>
          {section.items.map(item => (
            <Chip
              key={item.id}
              avatar={<Avatar src={item.cover} />}
              label={item.name}
              onClick={() => handleOnClick(item, section.type)}
              variant="outlined"
              size="small"
            />
          ))}
        </ListItem>
      )}

      {section.type === 'service' &&
        section.items.map(item => (
          <ServiceHintItem
            key={item.id}
            service={item}
            onClick={() => handleOnClick(item, section.type)}
          />
        ))}

      {section.type === 'salon' &&
        section.items.map(item => (
          <SalonHintItem
            key={item.id}
            salon={item}
            onClick={() => handleOnClick(item, section.type)}
          />
        ))}
    </>
  );
}

ContentHints.propTypes = {
  section: PropTypes.object,
  onClick: PropTypes.func,
};

export default memo(ContentHints);
