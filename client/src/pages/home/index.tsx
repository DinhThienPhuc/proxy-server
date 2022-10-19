/* PAGE: HOME
   ========================================================================== */

import { getListExams } from "api/post/post.api";
import Styled from "./index.style";

const Home = () => {
  const listExamsResponse = getListExams();

  return (
    <Styled.Container>
      <p>Home page</p>
      <p>App name: {process.env.REACT_APP_NAME}</p>
    </Styled.Container>
  );
};

export default Home;
