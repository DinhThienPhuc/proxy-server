import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Question, { QUESTION_TYPE } from "./components/Question";
import { getDetailExams, markExam } from "api/post/post.api";
import { useCallback, useEffect, useState } from "react";

import Styled from "./index.style";
import { t } from "i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import ModalComponent from "components/Modal";

enum Mode {
  VIEW = "view",
  TEST = "test",
}

export enum ModalType {
  SUBMIT = "submit",
  FAIL = "fail",
}

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IDetail>({} as IDetail);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.SUBMIT);
  const [formPayload, setFormPayload] = useState<FieldValues>({});

  const handleOpenModal = () => {
    setModalType(ModalType.SUBMIT);
    setIsOpenModal(true);
  };

  const onSubmit = useCallback(
    async (payload: any) => {
      await markExam(data.id as string, payload);
      navigate(`/exams/${data?.id}?status=view`, {
        replace: true,
      });
      setIsOpenModal(false);
    },
    [data.id, navigate],
  );

  const getData = useCallback(
    async (id?: string) => {
      try {
        const listExamsResponse = await getDetailExams({ id });
        if (listExamsResponse?.data) {
          const status = searchParams.get("status");
          if (status === Mode.VIEW) {
            setData(listExamsResponse?.data);
          } else {
            const newQuestions: Question[] =
              listExamsResponse?.data?.questions?.map((i: Question) => ({
                ...i,
                userAnswer: null,
              }));
            const newData: IDetail = {
              ...listExamsResponse?.data,
              questions: newQuestions,
            };
            setData(newData);
          }
        } else {
          setData({} as IDetail);
        }
      } catch (e) {
        console.error("error", e);
      }
    },
    [searchParams],
  );

  const handleRetest = useCallback(() => {
    navigate(`/exams/${data?.id}?status=test`, {
      replace: true,
    });
  }, [data?.id, navigate]);

  const handleOkModal = useCallback(() => {
    const payload = method.getValues();
    if (modalType === ModalType.FAIL) {
      setIsOpenModal(false);
      return;
    }
    if (
      !!data?.questions &&
      Object.keys(payload).length < data?.questions?.length
    ) {
      setModalType(ModalType.FAIL);
      setFormPayload(payload);
      return;
    }
    onSubmit(payload);
  }, [data?.questions, method, modalType, onSubmit]);

  useEffect(() => {
    if (params?.id) {
      getData(params?.id);
      return;
    }
  }, [getData, params, searchParams]);

  return (
    <FormProvider {...method}>
      <Styled.FormContainer onSubmit={method.handleSubmit(onSubmit)}>
        {/* <Styled.DetailContainer> */}
        <Styled.TestName>{data?.name}</Styled.TestName>
        <Styled.TestDescription>{data?.description}</Styled.TestDescription>
        {data?.examScore && searchParams.get("status") === Mode.VIEW && (
          <Styled.Score>{t("detail.score") + data?.examScore}</Styled.Score>
        )}
        {data?.questions?.map((i, index) => (
          <Question
            formPayload={formPayload}
            statusType={modalType}
            key={i.id}
            questionId={i.id.toString()}
            type={i.type as QUESTION_TYPE}
            title={i.title}
            option_1={i.a}
            option_2={i.b}
            option_3={i.c}
            option_4={i.d}
            value={i.userAnswer === null ? undefined : i.userAnswer}
            no={index + 1}
            isRight={i.isRight}
          />
        ))}
        {/* </Styled.DetailContainer> */}
        <Styled.ButtonContainer>
          {data && data?.examScore && searchParams.get("status") === Mode.VIEW && (
            <Styled.ReworkButton type="button" onClick={handleRetest}>
              {t("detail.retest")}
            </Styled.ReworkButton>
          )}
          {((data && !data?.examScore) ||
            searchParams.get("status") === Mode.TEST) && (
            <Styled.SubmitButton type="button" onClick={handleOpenModal}>
              {t("detail.submit")}
            </Styled.SubmitButton>
          )}
        </Styled.ButtonContainer>
      </Styled.FormContainer>
      <ModalComponent
        isOpen={isOpenModal}
        title={t("detail.modal_test_title")}
        description={
          modalType === ModalType.FAIL
            ? t("detail.not_enough_field")
            : t("detail.modal_test_description")
        }
        onCancel={() => setIsOpenModal(false)}
        onOk={handleOkModal}
        onClose={() => setIsOpenModal(false)}
      />
    </FormProvider>
  );
};

export default Detail;
