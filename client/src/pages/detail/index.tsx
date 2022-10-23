import React from "react";
import Question, { QUESTION_TYPE } from "./components/Question";
import Styled from "./index.style";

const Detail = () => {
  return (
    <form>
      <Styled.DetailContainer>
        <Question
          questionId={"1"}
          type={QUESTION_TYPE.SINGLE_CHOICE}
          title={"Nào ready thì gửi link meet cho a nhoé"}
          no={1}
        />
        <Question
          questionId={"2"}
          type={QUESTION_TYPE.MULTIPLE_CHOICE}
          title={"Nào ready thì gửi link meet cho a nhoé"}
          no={2}
        />
        <Question
          questionId={"3"}
          type={QUESTION_TYPE.FILL_MISSING_TEXT}
          title={"Nào ready thì gửi link meet cho a nhoé"}
          no={3}
        />
      </Styled.DetailContainer>
    </form>
  );
};

export default Detail;
