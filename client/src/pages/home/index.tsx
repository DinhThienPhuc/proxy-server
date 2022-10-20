/* PAGE: HOME
   ========================================================================== */

import Styled from "./index.style";
import { getListExams } from "../../api/post/post.api";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    (async () => {
      try {
        const listExamsResponse = await getListExams();

        console.log("meo", listExamsResponse?.data);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <Styled.Container>
      <p>Home page</p>
      <p>App name: {process.env.REACT_APP_NAME}</p>
    </Styled.Container>
  );
};

export default Home;
