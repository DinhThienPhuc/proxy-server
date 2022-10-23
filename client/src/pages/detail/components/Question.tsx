import React from "react";
import { useTranslation } from "react-i18next";
import Styled from "./index.style";

export enum QUESTION_TYPE {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  SINGLE_CHOICE = "SINGLE_CHOICE",
  FILL_MISSING_TEXT = "FILL_MISSING_TEXT",
}

interface Props extends QuestionProps {
  questionId?: string;
  type: QUESTION_TYPE;
}

interface QuestionProps {
  no?: number;
  title?: string;
  option_1?: string;
  option_2?: string;
  option_3?: string;
  option_4?: string;
}

const Question = (props: Props) => {
  const { t } = useTranslation();

  const renderTypeQuestion = () => {
    switch (props.type) {
      case QUESTION_TYPE.SINGLE_CHOICE:
        return;
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return;
      case QUESTION_TYPE.FILL_MISSING_TEXT:
        return;
      default:
        return null;
    }
  };

  return (
    <Styled.QuestionContainer>
      <Styled.QuestionTitle>
        <Styled.QuestionNo>
          {t("detail.question_no") + " " + props?.no}:
        </Styled.QuestionNo>
        {props?.title}
      </Styled.QuestionTitle>
      {renderTypeQuestion()}
    </Styled.QuestionContainer>
  );
};

export default Question;
