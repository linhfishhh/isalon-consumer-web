import { isMobileOnly } from 'utils/platform';

const overrides = {
  // MuiPickers
  MuiPickersDay: {
    day: {
      fontWeight: '300',
    },
  },
  MuiPickersYear: {
    root: {
      height: '64px',
    },
  },
  MuiPickersCalendar: {
    transitionContainer: {
      marginTop: '6px',
    },
  },
  MuiPickersCalendarHeader: {
    iconButton: {
      backgroundColor: 'transparent',
      '& > *': {
        backgroundColor: 'transparent',
      },
    },
    switchHeader: {
      marginTop: '2px',
      marginBottom: '4px',
    },
  },
  MuiPickersClock: {
    container: {
      margin: `32px 0 4px`,
    },
  },

  MuiPickersClockNumber: {
    clockNumber: {
      left: `calc(50% - 16px)`,
      width: '32px',
      height: '32px',
    },
  },
  MuiPickerDTHeader: {
    dateHeader: {
      '& h4': {
        fontSize: '2.125rem',
        fontWeight: 400,
      },
    },
    timeHeader: {
      '& h3': {
        fontSize: '3rem',
        fontWeight: 400,
      },
    },
  },
  MuiPickersTimePicker: {
    hourMinuteLabel: {
      '& h2': {
        fontSize: '3.75rem',
        fontWeight: 300,
      },
    },
  },
  MuiPickersToolbar: {
    toolbar: {
      '& h4': {
        fontSize: '2.125rem',
        fontWeight: 400,
      },
    },
  },
  MuiPickersBasePicker: {
    pickerView: {
      minWidth: isMobileOnly ? '100%' : 310,
    },
  },
  MuiPickersStaticWrapper: {
    staticWrapperRoot: {
      minWidth: isMobileOnly ? '100%' : 310,
    },
  },
  MuiPickersDatePickerRoot: {
    dateLandscape: {
      marginRight: 0,
    },
  },
  // orther component
  MuiDialog: {
    paper: {
      overflowY: 'unset',
    },
  },
  MuiTableCell: {
    sizeSmall: {
      padding: '5px 10px',
    },
  },
  MuiDialogContent: {
    dividers: {
      padding: 10,
    },
  },
  MuiBadge: {
    badge: {
      wordBreak: 'normal',
    },
  },
  MuiToolbar: {
    dense: {
      minHeight: 44,
    },
  },
};

export default overrides;
