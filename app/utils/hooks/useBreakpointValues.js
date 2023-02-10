import useMediaQuery from '@material-ui/core/useMediaQuery';

export const useBreakpointValues = (values, option = 'up') => {
  const xl = useMediaQuery(theme => theme.breakpoints[option]('xl'));
  const lg = useMediaQuery(theme => theme.breakpoints[option]('lg'));
  const md = useMediaQuery(theme => theme.breakpoints[option]('md'));
  const sm = useMediaQuery(theme => theme.breakpoints[option]('sm'));
  const xs = useMediaQuery(theme => theme.breakpoints[option]('xs'));

  const breakpoints = { xl, lg, md, sm, xs };

  const points = Object.keys(values);
  const breakpointValues = points.map(key => ({
    value: values[key],
    match: breakpoints[key],
  }));
  let pointValues = breakpointValues;
  if (option === 'up') {
    pointValues = breakpointValues.reverse();
  }

  const result = pointValues.find(item => item.match);
  const defaultValue = values[points[0]].value;

  return result ? result.value : defaultValue;
};
