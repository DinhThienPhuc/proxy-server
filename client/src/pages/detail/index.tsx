import { getDetailExams } from "api/post/post.api";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Question, { QUESTION_TYPE } from "./components/Question";
import Styled from "./index.style";

export interface Question {
  a: string | null;
  b: string | null;
  c: string | null;
  createdAt: string;
  d: string | null;
  examScore: string;
  id: string;
  isRight: boolean;
  title: string;
  type: string;
  updatedAt: string;
  userAnswer: string;
}

export interface Detail {
  description?: string;
  id?: string;
  name?: string;
  questions?: Question[];
}

const Detail = () => {
  const method = useForm();
  const params = useParams();
  const [data, setData] = useState<Detail>({} as Detail);

  const onSubmit = (data: any) => console.log(data);

  const getData = async (id?: string) => {
    try {
      const listExamsResponse = await getDetailExams({ id: id });
      if (listExamsResponse?.data) {
        setData(listExamsResponse?.data);
      } else setData({} as Detail);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getData(params?.id);
      return;
    }
  }, [params?.id]);

  return (
    <FormProvider {...method}>
      <Styled.FormContainer onSubmit={method.handleSubmit(onSubmit)}>
        {/* <Styled.DetailContainer> */}
        <Styled.TestName>{data?.name}</Styled.TestName>
        <Styled.TestDescription>{data?.description}</Styled.TestDescription>
        {!!data?.questions &&
          data?.questions?.map((i, index) => (
            <Question
              key={i.id}
              questionId={i.id.toString()}
              type={i.type as QUESTION_TYPE}
              title={i.title}
              option_1={i.a}
              option_2={i.b}
              option_3={i.c}
              option_4={i.d}
              no={index + 1}
            />
          ))}
        {/* </Styled.DetailContainer> */}
        <Styled.ButtonContainer>
          <Styled.ReworkButton type="button">
            {t("detail.retest")}
          </Styled.ReworkButton>
          <Styled.SubmitButton type="submit">
            {t("detail.submit")}
          </Styled.SubmitButton>
        </Styled.ButtonContainer>
      </Styled.FormContainer>
    </FormProvider>
  );
};

export default Detail;
