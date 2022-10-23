import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Question, { QUESTION_TYPE } from "./components/Question";
import Styled from "./index.style";

const Detail = () => {
  const method = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(onSubmit)}>
        <Styled.DetailContainer>
          <Question
            questionId={"1"}
            type={QUESTION_TYPE.SINGLE_CHOICE}
            title={"Nào ready thì gửi link meet cho a nhoé"}
            option_1={"ok"}
            option_2={"okkk"}
            option_3={"okkkkk"}
            option_4={"okkkkkkk"}
            no={1}
          />
          <Question
            questionId={"2"}
            type={QUESTION_TYPE.MULTIPLE_CHOICE}
            title={"Nào ready thì gửi link meet cho a nhoé"}
            option_1={"ok"}
            option_2={"okkk"}
            option_3={"okkkkk"}
            option_4={"okkkkkkk"}
            no={2}
          />
          <Question
            questionId={"3"}
            type={QUESTION_TYPE.FILL_MISSING_TEXT}
            title={"Nào ready thì gửi link meet cho a nhoé"}
            no={3}
          />
        </Styled.DetailContainer>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default Detail;
