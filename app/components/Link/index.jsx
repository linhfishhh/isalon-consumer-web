import React from 'react';
import { NavLink } from 'react-router-dom';

const Link = React.forwardRef((props, ref) => <NavLink ref={ref} {...props} />);

export default Link;
