import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    width: '100%',
  },
  title: {
    color: 'white',
    height: '100%',
  },
  titleBar: {
    background: 'transparent',
    height: 'auto',
  },
  icon: {
    color: 'white',
    width: 60,
    height: 60,
  },
  image: {
    width: 100,
    height: 100,
  },
}));

const InputFile = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
const Label = styled.label`
  max-width: 100%;
  font-size: ${props => props.theme.typography.body1.fontSize}px;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  text-align: center;
  svg {
    vertical-align: middle;
    fill: currentColor;
    margin-top: -0.25em;
    margin-right: -0.25em;
  }
  figure {
    width: 100px;
    height: 100px;
    background-color: #ddd;
    display: block;
    padding: 20px;
    margin: 0 auto;
    border-radius: 4px;
  }
  span {
    min-height: 2em;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: top;
  }
`;

const ImageStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: solid 1px #ddd;
  border-radius: 4px;
`;

export { useStyles, InputFile, Label, ImageStyle };
