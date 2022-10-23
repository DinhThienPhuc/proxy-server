import React from "react";
import Question, { QUESTION_TYPE } from "./components/Question";
import Styled from "./index.style";

const Detail = () => {
  return (
    <Styled.DetailContainer>
      <Question
        type={QUESTION_TYPE.SINGLE_CHOICE}
        title={"Nào ready thì gửi link meet cho a nhoé"}
        no={1}
      />
      <Question
        type={QUESTION_TYPE.MULTIPLE_CHOICE}
        title={"Nào ready thì gửi link meet cho a nhoé"}
        no={2}
      />
      <Question
        type={QUESTION_TYPE.FILL_MISSING_TEXT}
        title={"Nào ready thì gửi link meet cho a nhoé"}
        no={3}
      />
    </Styled.DetailContainer>
  );
};

export default Detail;
