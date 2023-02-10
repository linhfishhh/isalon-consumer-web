import styled from 'styled-components';

const WrapperMenu = styled.ul`
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
    ul.sub-menu {
      visibility: hidden;
      display: block;
      position: absolute;
      left: 0;
      padding-left: 130px;
      height: 35px;
      line-height: 35px;
      opacity: 0;
      width: 100%;
    }
  }
  > li {
    > a {
      height: 35px;
      line-height: 35px;
      border: solid 1px ${props => props.theme.palette.borderColor[1]};
      border-radius: 4px;
      padding: 0 20px;
      font-size: 14px;
      text-transform: uppercase;
    }
    > a.hasSub {
      padding-right: 25px;
      :after {
        content: '';
        position: absolute;
        height: 0;
        width: 0;
        border: 5px solid transparent;
        border-top-color: ${props => props.theme.palette.textColor[2]};
        top: 48%;
        margin-left: 5px;
      }
    }
    > a.active {
      color: #fff;
      background-color: ${props => props.theme.palette.primary.main};
      :after {
        border-top-color: #fff;
      }
    }
    :hover {
      > a {
        color: #fff;
        background-color: ${props => props.theme.palette.primary.main};
        transition-property: background-color;
        transition-duration: 0.4s;
      }
      > a.hasSub {
        padding-right: 25px;
        :after {
          border-top-color: #fff;
        }
      }
      ul {
        visibility: visible;
        opacity: 1;
        transition-property: opacity;
        transition-duration: 0.4s;
        > li > a {
          :hover {
            color: ${props => props.theme.palette.primary.main};
          }
        }
      }
    }
  }
`;

export { WrapperMenu };
