import { FormProvider, useForm } from "react-hook-form";
import Question, { QUESTION_TYPE } from "./components/Question";
import { getDetailExams, markExam } from "api/post/post.api";
import { useCallback, useEffect, useState } from "react";

import Styled from "./index.style";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ModalComponent from "components/Modal";

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

export interface IDetail {
  description?: string;
  id?: string;
  name?: string;
  examScore?: string | number;
  questions?: Question[];
}

const Detail = () => {
  const method = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IDetail>({} as IDetail);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const onSubmit = useCallback(
    async (payload: any) => {
      await markExam(data.id as string, payload);
      navigate(`/exams/${data?.id}?status=view`, {
        replace: true,
      });
    },
    [data.id, navigate],
  );

  const getData = useCallback(async (id?: string) => {
    try {
      const listExamsResponse = await getDetailExams({ id });
      if (listExamsResponse?.data) {
        setData(listExamsResponse?.data);
      } else {
        setData({} as IDetail);
      }
    } catch (e) {
      console.error("error", e);
    }
  }, []);

  const handleRetest = useCallback(() => {
    navigate(`/exams/${data?.id}?status=test`, {
      replace: true,
    });
  }, [data?.id, navigate]);

  useEffect(() => {
    if (params?.id) {
      getData(params?.id);
      return;
    }
  }, [getData, params?.id]);

  return (
    <FormProvider {...method}>
      <Styled.FormContainer onSubmit={method.handleSubmit(onSubmit)}>
        {/* <Styled.DetailContainer> */}
        <Styled.TestName>{data?.name}</Styled.TestName>
        <Styled.TestDescription>{data?.description}</Styled.TestDescription>
        {data?.questions?.map((i, index) => (
          <Question
            key={i.id}
            questionId={i.id.toString()}
            type={i.type as QUESTION_TYPE}
            title={i.title}
            option_1={i.a}
            option_2={i.b}
            option_3={i.c}
            option_4={i.d}
            value={i.userAnswer}
            no={index + 1}
            isRight={i.isRight}
          />
        ))}
        {/* </Styled.DetailContainer> */}
        <Styled.ButtonContainer>
          {data && data?.examScore && (
            <Styled.ReworkButton type="button" onClick={handleRetest}>
              {t("detail.retest")}
            </Styled.ReworkButton>
          )}
          {data && !data?.examScore && (
            <Styled.SubmitButton type="submit">
              {t("detail.submit")}
            </Styled.SubmitButton>
          )}
        </Styled.ButtonContainer>
      </Styled.FormContainer>
      <ModalComponent isOpen={isOpenModal} />
    </FormProvider>
  );
};

export default Detail;
