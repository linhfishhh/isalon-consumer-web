import { createMuiTheme } from '@material-ui/core/styles';

import { hexToRgb } from 'assets/colors';
import variants from './variants';
import typography from './typography';
import overrides from './overrides';
import breakpoints from './breakpoints';
import props from './props';

const theme = variant =>
  createMuiTheme(
    {
      spacing: 4,
      breakpoints,
      overrides,
      props,
      typography,
      palette: variant.palette,
      hexToRgb,
    },
    variant.name,
  );

const themes = variants.map(variant => theme(variant));

export default themes;
