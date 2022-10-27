import { FormProvider, useForm } from "react-hook-form";
import Question, { QUESTION_TYPE } from "./components/Question";

import Styled from "./index.style";
const data = {
  id: 1,
  name: "IELTS exam 1",
  description: "Test ieltes",
  questions: [
    {
      id: 1,
      title: "Question 1",
      type: "MULTIPLE_CHOICE",
      option_1: "1",
      option_2: "2",
      option_3: "3",
      option_4: "4",
      is_this_answer_right: false,
      question_id: 1,
    },
    {
      id: 2,
      title: "Question 2",
      type: "SINGLE_CHOICE",
      option_1: "4",
      option_2: "3",
      option_3: "3",
      option_4: "1",
      is_this_answer_right: true,
      question_id: 1,
    },
    {
      id: 3,
      title: "Question 3",
      type: "FILL_MISSING_TEXT",
      option_1: null,
      option_2: null,
      option_3: null,
      option_4: null,
      is_this_answer_right: false,
      question_id: 1,
    },
    {
      id: 4,
      title: "Question 4",
      type: "MULTIPLE_CHOICE",
      option_1: "1",
      option_2: "2",
      option_3: "3",
      option_4: "4",
      is_this_answer_right: true,
      question_id: 1,
    },
    {
      id: 5,
      title: "Question 5",
      type: "SINGLE_CHOICE",
      option_1: "4",
      option_2: "3",
      option_3: "3",
      option_4: "1",
      is_this_answer_right: false,
      question_id: 1,
    },
    {
      id: 6,
      title: "Question 6",
      type: "FILL_MISSING_TEXT",
      option_1: null,
      option_2: null,
      option_3: null,
      option_4: null,
      is_this_answer_right: true,
      question_id: 1,
    },
    {
      id: 7,
      title: "Question 7",
      type: "MULTIPLE_CHOICE",
      option_1: "1",
      option_2: "2",
      option_3: "3",
      option_4: "4",
      is_this_answer_right: true,
      question_id: 1,
    },
  ],
};
const Detail = () => {
  const method = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(onSubmit)}>
        <Styled.DetailContainer>
          {data.questions.map((i) => (
            <Question
              key={i.id}
              questionId={i.id.toString()}
              type={i.type as QUESTION_TYPE}
              title={i.title}
              option_1={i.option_1}
              option_2={i.option_2}
              option_3={i.option_3}
              option_4={i.option_4}
              no={1}
            />
          ))}
        </Styled.DetailContainer>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default Detail;
