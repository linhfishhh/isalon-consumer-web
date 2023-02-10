/* eslint-disable react/style-prop-object */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import useStyle from './styles';

export const BellIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 17.4 18.1">
      <g>
        <path
          className={classes.cls_1}
          d="M11.68,16.18a3.27,3.27,0,0,0,1.21-2.07c.35-2-.08-2.37,1.34-4.14S17,5.47,15,2.8c0,0-2.12-2.71-5.16-1.71C7.43,1.88,7,3.86,4.91,4.19,3.12,4.48,2,3.9.93,5.33A1,1,0,0,0,1,6.59l4.44,4.48"
        />
        <circle className={classes.cls_2} cx="6.67" cy="16.02" r="2.08" />
        <line
          className={classes.cls_1}
          x1="14.77"
          y1="2.58"
          x2="16.65"
          y2="0.75"
        />
      </g>
    </SvgIcon>
  );
};

export const BookingIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 18.93 17.52">
      <g>
        <rect
          className={classes.cls_1}
          x="3.61"
          y="3.58"
          width="14.57"
          height="13.19"
          rx="2.28"
        />
        <path
          className={classes.cls_1}
          d="M3.32,13.94A2.64,2.64,0,0,1,.75,11.05V3.64A2.89,2.89,0,0,1,3.64.75h8.79A2.6,2.6,0,0,1,15.3,3.3"
        />
        <line
          className={classes.cls_1}
          x1="13.5"
          y1="9.62"
          x2="13.5"
          y2="14.82"
        />
        <line
          className={classes.cls_1}
          x1="16.1"
          y1="12.22"
          x2="10.9"
          y2="12.22"
        />
        <line
          className={classes.cls_1}
          x1="3.61"
          y1="7.34"
          x2="18.18"
          y2="7.34"
        />
      </g>
    </SvgIcon>
  );
};

export const CartIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 19.84 19.6">
      <g>
        <path
          className={classes.cls_1}
          d="M.75.75H2A1.47,1.47,0,0,1,3.47,2.08l.92,10a3.09,3.09,0,0,0,3.07,2.8h7.66a3.51,3.51,0,0,0,3.49-3.18l.47-5a3.17,3.17,0,0,0-3.15-3.46H7.18"
        />
        <circle className={classes.cls_2} cx="5.88" cy="18.1" r="1.5" />
        <circle className={classes.cls_2} cx="16.53" cy="18.1" r="1.5" />
      </g>
    </SvgIcon>
  );
};

export const UserIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 18.71 20.38">
      <g>
        <circle className={classes.cls_1} cx="9.36" cy="5.89" r="5.14" />
        <path
          className={classes.cls_1}
          d="M.75,19.63a8.61,8.61,0,1,1,17.21,0"
        />
      </g>
    </SvgIcon>
  );
};

export const MakeupIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 28.88 30.7">
      <g>
        <path
          className={classes.cls_2}
          d="M9,14.63a.89.89,0,1,1-.88-.88A.88.88,0,0,1,9,14.63Z"
        />
        <circle className={classes.cls_2} cx="11.92" cy="26.54" r="1.37" />
        <path
          className={classes.cls_1}
          d="M8.28,26.54a3.65,3.65,0,1,0,3.64-3.65,3.54,3.54,0,0,0-.73.07S11.85,6.69,8.28.5C8.28.5,5.14,3,5.22,16.72l3.12,2.14Z"
        />
        <circle className={classes.cls_2} cx="4.39" cy="26.54" r="1.37" />
        <path
          className={classes.cls_1}
          d="M6.45,29.37a3.65,3.65,0,1,1-2.3-6.48,3.54,3.54,0,0,1,.73.07l.34.09h0V19.73"
        />
        <path
          className={classes.cls_1}
          d="M15.57,15.34h5.75s2,.08,1.51,2.72S18.92,29.78,24,30.18c5.33.42,1.76-8,2.85-11.56S30.72,1.15,24.2.5H15.57"
        />
        <line
          className={classes.cls_1}
          x1="15.57"
          y1="3.48"
          x2="23.01"
          y2="3.48"
        />
        <line
          className={classes.cls_1}
          x1="15.57"
          y1="6.43"
          x2="23.01"
          y2="6.43"
        />
        <line
          className={classes.cls_1}
          x1="15.57"
          y1="9.37"
          x2="23.01"
          y2="9.37"
        />
        <line
          className={classes.cls_1}
          x1="15.57"
          y1="12.31"
          x2="23.01"
          y2="12.31"
        />
      </g>
    </SvgIcon>
  );
};

export const ProductIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 28.12 31.7">
      <g>
        <rect
          className={classes.cls_1}
          x="4.18"
          y="3.37"
          width="4.41"
          height="3.5"
        />
        <path
          className={classes.cls_1}
          d="M11,31.2H1.46a1,1,0,0,1-1-1V11A4.12,4.12,0,0,1,4.62,6.87H8.14a4.09,4.09,0,0,1,2.54.87A4.18,4.18,0,0,1,11.9,9.28"
        />
        <line
          className={classes.cls_1}
          x1="6.38"
          y1="3.37"
          x2="6.38"
          y2="0.51"
        />
        <path
          className={classes.cls_1}
          d="M8.59.51H4.18a2.59,2.59,0,0,0-2.07.88"
        />
        <path
          className={classes.cls_1}
          d="M16.11,31.2H11.69a.78.78,0,0,1-.78-.72L9.26,10.12A.78.78,0,0,1,10,9.28H19a.78.78,0,0,1,.78.84l-.9,11.16"
        />
        <line
          className={classes.cls_1}
          x1="19.58"
          y1="12.1"
          x2="11.44"
          y2="12.1"
        />
        <line
          className={classes.cls_1}
          x1="10.68"
          y1="27.66"
          x2="16.11"
          y2="27.66"
        />
        <path
          className={classes.cls_1}
          d="M27.16,31.2H16.56a.45.45,0,0,1-.45-.46v-6.4a.46.46,0,0,1,.45-.46h10.6a.47.47,0,0,1,.46.46v6.4A.46.46,0,0,1,27.16,31.2Z"
        />
        <path
          className={classes.cls_1}
          d="M25.88,21.28h-8a.93.93,0,0,0-.93.93v1.67h9.91V22.21A.93.93,0,0,0,25.88,21.28Z"
        />
      </g>
    </SvgIcon>
  );
};

export const WalletIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 23.71 23.13">
      <g>
        <path
          className={classes.cls_1}
          d="M22,16.14v3.65a2.85,2.85,0,0,1-2.85,2.84H3.34A2.84,2.84,0,0,1,.5,19.79V6.43A2.84,2.84,0,0,1,3.34,3.59H19.18A2.85,2.85,0,0,1,22,6.43V11"
        />
        <path
          className={classes.cls_1}
          d="M18.29,11h4.6a.32.32,0,0,1,.32.32v4.48a.32.32,0,0,1-.32.32h-4.6a2.45,2.45,0,0,1-2.45-2.45v-.21A2.45,2.45,0,0,1,18.29,11Z"
        />
        <path
          className={classes.cls_2}
          d="M4.37,6.18,14.88.2A1.52,1.52,0,0,1,17,.8L19.9,6.18Z"
        />
        <line
          className={classes.cls_1}
          x1="2.4"
          y1="6.18"
          x2="22.03"
          y2="6.18"
        />
      </g>
    </SvgIcon>
  );
};

export const NotificationIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 26.8 28.63">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            d="M16.16,22.51a4.69,4.69,0,0,0,1.71-2.92c.49-2.77-.12-3.35,1.89-5.85s3.89-6.33,1-10.1c0,0-3-3.82-7.28-2.4-3.36,1.1-4,3.9-6.9,4.37C4.09,6,2.46,5.19,1,7.21A1.4,1.4,0,0,0,1.16,9L7.41,15.3"
            className={classes.cls_1}
          />
          <circle cx="9.09" cy="22.28" r="2.94" className={classes.cls_2} />
          <line
            x1="20.52"
            y1="3.32"
            x2="23.16"
            y2="0.75"
            className={classes.cls_1}
          />
        </g>
      </g>
    </SvgIcon>
  );
};

export const OptionIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 24.49 23.63">
      <g>
        <path
          className={classes.cls_3}
          d="M6.2,3.35A2.85,2.85,0,1,1,3.35.5,2.86,2.86,0,0,1,6.2,3.35Z"
        />
        <path
          className={classes.cls_4}
          d="M6.2,11.81A2.85,2.85,0,1,1,3.35,9,2.85,2.85,0,0,1,6.2,11.81Z"
        />
        <path
          className={classes.cls_3}
          d="M6.2,20.28a2.85,2.85,0,1,1-2.85-2.85A2.86,2.86,0,0,1,6.2,20.28Z"
        />
        <line
          className={classes.cls_3}
          x1="8.68"
          y1="3.35"
          x2="24.49"
          y2="3.35"
        />
        <line
          className={classes.cls_4}
          x1="8.68"
          y1="11.81"
          x2="24.49"
          y2="11.81"
        />
        <line
          className={classes.cls_3}
          x1="8.68"
          y1="20.28"
          x2="24.49"
          y2="20.28"
        />
      </g>
    </SvgIcon>
  );
};

export const ShieldIcon = props => (
  <SvgIcon viewBox="0 0 231 130.77" {...props}>
    <g>
      <polyline
        points="136.56 65.35 110.4 91.51 94 75.11"
        style={{
          fill: 'none',
          stroke: '#ff5c39',
          strokeMiterlimit: '10',
          strokeWidth: '5px',
        }}
      />
      <path
        d="M154.82,52.85c-17.82-1-33.4-8-43-21.85-9.56,13.81-25.15,20.85-43,21.85-2,36.81,20.72,68,42.89,77.37l.07,0,.06,0C134.1,120.84,156.86,89.66,154.82,52.85Z"
        style={{ fill: 'none', stroke: '#211915', strokeMiterlimit: '10' }}
      />
      <circle cx="42" cy="12" r="4" style={{ fill: '#ccc' }} />
      <circle cx="227" cy="102" r="4" style={{ fill: '#ccc' }} />
      <circle cx="174" cy="41" r="5" style={{ fill: '#f2f2f2' }} />
      <circle cx="61" cy="117" r="5" style={{ fill: '#e6e6e6' }} />
      <circle cx="3" cy="120" r="3" style={{ fill: '#f2f2f2' }} />
      <circle cx="171" cy="112" r="3" style={{ fill: '#f2f2f2' }} />
      <circle cx="112" cy="12" r="3" style={{ fill: '#e6e6e6' }} />
      <circle cx="202" cy="3" r="3" style={{ fill: '#e6e6e6' }} />
      <circle cx="30" cy="61" r="3" style={{ fill: '#e6e6e6' }} />
    </g>
  </SvgIcon>
);

export const HelloIcon = props => (
  <SvgIcon viewBox="0 0 246 175.87" {...props}>
    <g>
      <circle cx="36.61" cy="128.85" r="4" style={{ fill: '#ccc' }} />
      <circle cx="118.08" cy="29.43" r="3" style={{ fill: '#e6e6e6' }} />
      <circle cx="57" cy="17.85" r="4" style={{ fill: '#ccc' }} />
      <circle cx="242" cy="107.85" r="4" style={{ fill: '#ccc' }} />
      <circle cx="189" cy="46.85" r="5" style={{ fill: '#f2f2f2' }} />
      <circle cx="76" cy="122.85" r="5" style={{ fill: '#e6e6e6' }} />
      <circle cx="3" cy="151.85" r="3" style={{ fill: '#f2f2f2' }} />
      <circle cx="186" cy="117.85" r="3" style={{ fill: '#f2f2f2' }} />
      <circle cx="127" cy="17.85" r="3" style={{ fill: '#e6e6e6' }} />
      <circle cx="217" cy="8.85" r="3" style={{ fill: '#e6e6e6' }} />
      <circle cx="45" cy="66.85" r="3" style={{ fill: '#e6e6e6' }} />
      <path
        d="M191.17,110.53c0,29.11-17.37,53.94-41.79,63.6-5.17,2.05-12.19-4.39-8.71-14.84A131.48,131.48,0,0,1,126.74,161c-4.19.22-12.18-1.74-12.18-1.74,5.22,8.71-3.17,17.4-7.55,15.91-25.93-8.79-44.69-34.42-44.69-64.67,0-37.5,28.84-67.9,64.42-67.9S191.17,73,191.17,110.53Z"
        style={{ fill: '#f2f2f2', stroke: '#001b37', strokeMiterlimit: '10' }}
      />
      <circle cx="99.1" cy="85.83" r="6.47" style={{ fill: '#001b37' }} />
      <circle cx="98.29" cy="85.09" r="1.34" style={{ fill: '#f9ffff' }} />
      <circle cx="154.46" cy="85.83" r="6.47" style={{ fill: '#001b37' }} />
      <path
        d="M155,85.09a1.34,1.34,0,1,1-1.34-1.34A1.34,1.34,0,0,1,155,85.09Z"
        style={{ fill: '#f9ffff' }}
      />
      <path
        d="M141.33,103.9c0,6.06-9.48,11.51-15.29,11.51-4.6,0-14.75-4.8-14.75-10.86,0-2.76-.13-4.84,2.38-6.77,3-2.3,7.7,4.38,12.64,4.38s9.2-6.65,12.21-4.29C141,99.79,141.33,101.18,141.33,103.9Z"
        style={{ fill: '#001b37' }}
      />
      <path
        d="M125.06,103.14c-.49,1.29-2.87,1.6-5.31.68s-4-2.72-3.55-4,2.86-1.6,5.31-.68S125.55,101.84,125.06,103.14Z"
        style={{ fill: '#f2f2f2' }}
      />
      <path
        d="M127.42,103.14c.48,1.29,2.86,1.6,5.31.68s4-2.72,3.55-4-2.87-1.6-5.31-.68S126.93,101.84,127.42,103.14Z"
        style={{ fill: '#f2f2f2' }}
      />
      <path
        d="M100.62,152.33a58.43,58.43,0,0,0,5.78,2.85,62.17,62.17,0,0,0,6,2.26A52.23,52.23,0,0,0,124.93,160a39.2,39.2,0,0,0,12.68-.93c1-.2,2-.56,3.08-.85s2-.7,3-1.16a41.75,41.75,0,0,0,5.71-3,34.19,34.19,0,0,1-11.58,5.72,32.6,32.6,0,0,1-6.42,1.13,38.49,38.49,0,0,1-6.53.05,49.85,49.85,0,0,1-12.68-2.8A51,51,0,0,1,100.62,152.33Z"
        style={{ fill: '#001b37' }}
      />
      <path
        d="M201.4,0C179.64,0,162,9.59,162,21.41c0,6.21,4.86,11.79,12.62,15.71-2.21,1.83,0,7.9,0,7.9a6.62,6.62,0,0,1,6.09-5.38h0a65.51,65.51,0,0,0,20.67,3.19c21.76,0,39.4-9.59,39.4-21.42S223.16,0,201.4,0Z"
        style={{ fill: '#ff5c39' }}
      />
      <text
        transform="translate(189 26.5) scale(0.93 1)"
        style={{
          fontSize: '21px',
          fill: '#fff',
          fontFamily: 'San Francisco Text',
        }}
      >
        hello
      </text>
    </g>
  </SvgIcon>
);

export const WriteReviewIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 30 30" {...props}>
      <g>
        <path
          d="M15,0A15,15,0,1,0,30,15,15,15,0,0,0,15,0Zm7.13,10.79-1.42,1.43-2.9-2.9-1.1,1.1,2.9,2.9-7.12,7.11-2.9-2.9-1.1,1.1,2.9,2.9-.71.71h0a.6.6,0,0,1-.36.26l-2.7.6H7.48a.57.57,0,0,1-.39-.16.53.53,0,0,1-.15-.52l.6-2.71a.52.52,0,0,1,.26-.35l0,0L19.23,7.89a.45.45,0,0,1,.61,0l2.29,2.3a.42.42,0,0,1,0,.6Z"
          className={classes.cls_5}
        />
      </g>
    </SvgIcon>
  );
};

export const FlashIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 5.8 11.35" {...props}>
      <g>
        <path
          d="M0,5.29,2.51,6a.2.2,0,0,1,.13.11.18.18,0,0,1,0,.16L.81,11.35l5-5.82L3.29,4.81a.19.19,0,0,1-.13-.1.29.29,0,0,1,0-.16L4.46,0Z"
          className={classes.cls_5}
        />
      </g>
    </SvgIcon>
  );
};

export const MenuAccountIcon = props => (
  <SvgIcon viewBox="0 0 27 27" {...props}>
    <g id="Layer_1-2" data-name="Layer 1">
      <circle
        cx="13.53"
        cy="13.53"
        r="13.03"
        style={{
          fill: 'none',
          stroke: '#fff',
          strokeMiterlimit: 10,
        }}
      />
      <path
        d="M19.52,17.57a7.23,7.23,0,0,1-11.8.25"
        style={{
          fill: 'none',
          stroke: '#fff',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: '2px',
        }}
      />
    </g>
  </SvgIcon>
);

export const MenuBookingHistoryIcon = props => (
  <SvgIcon viewBox="0 0 26.8 28.63" {...props}>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          d="M1.76,19A12.9,12.9,0,1,1,13.4,26.3"
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
        <polyline
          points="9.05 5.63 13.4 13.4 21.41 13.4"
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
        <polyline
          points="14.07 24.46 12.65 26.42 14.82 28.13"
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
      </g>
    </g>
  </SvgIcon>
);

export const MenuGalleryIcon = props => (
  <SvgIcon viewBox="0 0 22.43 19.82" {...props}>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <rect
          x="0.5"
          y="5.39"
          width="16.31"
          height="13.93"
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeMiterlimit: 10,
          }}
        />
        <polyline
          points="3.06 2.94 19.37 2.94 19.37 16.88"
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeMiterlimit: 10,
          }}
        />
        <polyline
          points="5.62 0.5 21.93 0.5 21.93 14.43"
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeMiterlimit: 10,
          }}
        />
        <polyline
          points="15.34 14.74 12.87 12.28 10.22 14.93"
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeMiterlimit: 10,
          }}
        />
        <polyline
          points="10.98 15.65 6.86 11.54 2.44 15.96"
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeMiterlimit: 10,
          }}
        />
        <circle cx="12.97" cy="9.57" r="1.1" style={{ fill: '#fff' }} />
      </g>
    </g>
  </SvgIcon>
);

export const MenuNotificationIcon = props => (
  <SvgIcon viewBox="0 0 26.8 28.63" {...props}>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          d="M16.16,22.51a4.69,4.69,0,0,0,1.71-2.92c.49-2.77-.12-3.35,1.89-5.85s3.89-6.33,1-10.1c0,0-3-3.82-7.28-2.4-3.36,1.1-4,3.9-6.9,4.37C4.09,6,2.46,5.19,1,7.21A1.4,1.4,0,0,0,1.16,9L7.41,15.3"
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 1.5,
          }}
        />
        <circle cx="9.09" cy="22.28" r="2.94" style={{ fill: '#fff' }} />
        <line
          x1="20.52"
          y1="3.32"
          x2="23.16"
          y2="0.75"
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 1.5,
          }}
        />
      </g>
    </g>
  </SvgIcon>
);

export const MenuPurchaseHistoryIcon = props => (
  <SvgIcon viewBox="0 0 23.22 22.5" {...props}>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          d="M22.85,13.15,21.67,12a1.24,1.24,0,0,0-1.75,0l-6.38,6.38-.88,3.23-.21.21a.41.41,0,0,0,0,.58h0a.42.42,0,0,0,.29.12.4.4,0,0,0,.29-.12l.22-.22,3.22-.88,6.38-6.38a1.23,1.23,0,0,0,0-1.75ZM14.5,18.57l4.24-4.25,1.76,1.76-4.24,4.25Zm-.37.79,1.33,1.34-1.84.5Zm8.14-5-1.18,1.17-1.76-1.76,1.18-1.17a.41.41,0,0,1,.58,0l1.18,1.18a.41.41,0,0,1,0,.58Z"
          style={{ fill: '#fff' }}
        />
        <path
          d="M11.19,5a.41.41,0,0,0,0,.82h7.47a.41.41,0,0,0,0-.82Z"
          style={{ fill: '#fff' }}
        />
        <path
          d="M19.07,11.19a.42.42,0,0,0-.41-.41H11.19a.42.42,0,0,0,0,.83h7.47a.42.42,0,0,0,.41-.42Z"
          style={{ fill: '#fff' }}
        />
        <path
          d="M8.53,3a.4.4,0,0,0-.58,0l-2.59,3L3.77,4.88A.41.41,0,0,0,3.19,5a.41.41,0,0,0,.09.58L5.17,7a.44.44,0,0,0,.25.08.39.39,0,0,0,.31-.15L8.58,3.59A.42.42,0,0,0,8.53,3Z"
          style={{ fill: '#fff' }}
        />
        <path
          d="M8.53,8.81a.41.41,0,0,0-.58,0l-2.59,3L3.77,10.68a.43.43,0,0,0-.58.09.41.41,0,0,0,.09.58l1.89,1.42a.44.44,0,0,0,.25.08.41.41,0,0,0,.31-.14L8.58,9.39a.41.41,0,0,0-.05-.58Z"
          style={{ fill: '#fff' }}
        />
        <path
          d="M8,15.07l-2.59,3L3.77,16.9a.42.42,0,0,0-.58.09.41.41,0,0,0,.09.58L5.17,19a.44.44,0,0,0,.25.08.41.41,0,0,0,.31-.14l2.85-3.32A.42.42,0,0,0,8.53,15a.41.41,0,0,0-.58.05Z"
          style={{ fill: '#fff' }}
        />
        <path
          d="M10.36,21.56H5.05A4.22,4.22,0,0,1,.83,17.34V5.05A4.22,4.22,0,0,1,5.05.83H17.34a4.22,4.22,0,0,1,4.22,4.22V10a.41.41,0,0,0,.41.41.41.41,0,0,0,.42-.41V5.05a5.06,5.06,0,0,0-5.05-5H5.05A5.06,5.06,0,0,0,0,5.05V17.34a5.06,5.06,0,0,0,5.05,5.05h5.31a.42.42,0,0,0,.42-.42.41.41,0,0,0-.42-.41Z"
          style={{ fill: '#fff' }}
        />
      </g>
    </g>
  </SvgIcon>
);

export const PhoneIcon = props => (
  <SvgIcon viewBox="0 0 18.85 18.84" {...props}>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          d="M18.84,14.86a.89.89,0,0,1-.28.8L15.91,18.3a1.72,1.72,0,0,1-.47.34,2.33,2.33,0,0,1-.57.18h-.38a10.68,10.68,0,0,1-1.23-.13,9.4,9.4,0,0,1-2.07-.64A17.46,17.46,0,0,1,8.4,16.54a21.32,21.32,0,0,1-3.31-2.79,21.76,21.76,0,0,1-2.31-2.64A17.22,17.22,0,0,1,1.3,8.79,13.08,13.08,0,0,1,.46,6.85,11.27,11.27,0,0,1,.08,5.36a5.84,5.84,0,0,1-.08-1C0,4.13,0,4,0,4A2.09,2.09,0,0,1,.2,3.4a1.72,1.72,0,0,1,.34-.47L3.2.28A.84.84,0,0,1,3.83,0a.73.73,0,0,1,.46.15,1.2,1.2,0,0,1,.34.37L6.77,4.57a1,1,0,0,1,.1.7,1.37,1.37,0,0,1-.34.64l-1,1A.32.32,0,0,0,5.48,7a.49.49,0,0,0,0,.15,3.39,3.39,0,0,0,.36,1,9.17,9.17,0,0,0,.74,1.17A12.12,12.12,0,0,0,8,10.87a13.18,13.18,0,0,0,1.6,1.43,9.73,9.73,0,0,0,1.17.75,2.87,2.87,0,0,0,.72.29l.25.05.13,0a.32.32,0,0,0,.13-.07l1.13-1.16a1.24,1.24,0,0,1,.84-.32,1,1,0,0,1,.54.12h0l3.85,2.28A1,1,0,0,1,18.84,14.86Z"
          style={{ fill: '#ff5c39' }}
        />
      </g>
    </g>
  </SvgIcon>
);

export const HomeIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 24.76 25.98">
      <g>
        <path
          className={classes.cls_1}
          d="M20.59,25.48H4.17A3.68,3.68,0,0,1,.5,21.8v-12a3.67,3.67,0,0,1,1.6-3l8.21-5.61a3.68,3.68,0,0,1,4.14,0l8.21,5.61a3.67,3.67,0,0,1,1.6,3v12A3.67,3.67,0,0,1,20.59,25.48Z"
        />
        <path
          className={classes.cls_1}
          d="M18.45,17.39a8.36,8.36,0,0,1-6,2.32,8.35,8.35,0,0,1-6-2.32"
        />
      </g>
    </SvgIcon>
  );
};

export const SignInIcon = props => {
  const classes = useStyle(props);
  return (
    <SvgIcon viewBox="0 0 26.67 27">
      <g>
        <path
          d="M16.54,14.4h0a7.18,7.18,0,0,1-6.39,0h0S.42,18.85.5,22.3a4.33,4.33,0,0,0,3.13,4.2H23.05a4.32,4.32,0,0,0,3.12-4.2C26.25,18.85,16.54,14.4,16.54,14.4Z"
          className={classes.cls_1}
        />
        <circle
          cx="13.34"
          cy="7.82"
          r="7.32"
          transform="translate(3.48 19.73) rotate(-80.78)"
          className={classes.cls_1}
        />
      </g>
    </SvgIcon>
  );
};
