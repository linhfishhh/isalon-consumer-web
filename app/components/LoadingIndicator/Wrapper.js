import styled from 'styled-components';
import { isMobileOnly } from 'utils/platform';

const Wrapper = styled.div`
  margin: ${isMobileOnly ? 0 : '40vh'} auto;
  width: 40px;
  height: 40px;
  position: relative;
`;

export default Wrapper;
