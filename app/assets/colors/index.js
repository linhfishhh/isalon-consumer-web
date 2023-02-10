// ##############################
// // // Function that converts from hex color to rgb color
// // // Example: input = #9c27b0 => output = 156, 39, 176
// // // Example: input = 9c27b0 => output = 156, 39, 176
// // // Example: input = #999 => output = 153, 153, 153
// // // Example: input = 999 => output = 153, 153, 153
// #############################
const hexToRgb = strHex => {
  let input = strHex;
  input = input.replace('#', '');
  const hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error('input is not a valid hex color.');
  }
  if (input.length === 3) {
    const first = input[0];
    const second = input[1];
    const last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  const first = input[0] + input[1];
  const second = input[2] + input[3];
  const last = input[4] + input[5];
  return `${parseInt(first, 16)}, ${parseInt(second, 16)}, ${parseInt(
    last,
    16,
  )}`;
};

const primaryColor = '#fe5a3a';
const secondaryColor = '#00a79b';
const warningColor = '#d50000';
const dangerColor = ['#f44336'];
const successColor = ['#4caf50'];
const borderColor = ['#cccccc', '#dddddd', '#eeeeee', '#ffffff'];
const badgeColor = '#ed1c24';
const textColor = [
  '#000000', // 0
  '#222222', // 1
  '#808285', // 2
  '#414042', // 3
  '#58595b', // 4
  '#6d6e71', // 5
  '#ffffff', // 6
  '#939598', // 7
  '#8e8e93', // 8
  '#fbbc05', // 9
];
const backgroundColor = [
  '#ffffff', // 1
  '#f2f2f2', // 2
  '#e6e7e8', // 3
  '#d1d3d4', // 4
  '#808080', // 5
  '#dc1662', // 6
  '#000000', // 7
  '#f4f4f4', // 8
  '#ffd5cd', // 9
];

export {
  hexToRgb,
  primaryColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  borderColor,
  textColor,
  badgeColor,
  backgroundColor,
};
