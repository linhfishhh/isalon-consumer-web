import styled from 'styled-components';

const WapperMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    float: left;
    width: auto;
    list-style: none;
    padding-left: 5px;
    a {
      display: block;
      width: auto;
      color: ${props => props.theme.palette.textColor[2]};
      font-size: 12px;
      padding: 0 5px;
    }
  }
  > li {
    > a {
      height: auto;
      line-height: 90px;
      padding: 0 20px;
      font-size: 14px;
    }
    > a.active {
      color: #fff;
      background-color: #111117;
      :after {
        border-top-color: #fff;
      }
    }
    :hover {
      > a {
        color: #fff;
        background-color: #111117;
        transition-property: background-color;
        transition-duration: 0.4s;
      }
      ul {
        visibility: visible;
        opacity: 1;
        transition-property: opacity;
        transition-duration: 0.4s;
        > li > a {
          :hover {
            color: #111117;
          }
        }
      }
    }
  }
`;

export { WapperMenu };
