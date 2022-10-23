import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Styled from "./index.style";
import { FieldValues, useFormContext, UseFormSetValue } from "react-hook-form";
import { Box, Checkbox } from "@mui/material";

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

interface SingleChoiceProps {
  options?: string[];
  questionId?: string;
  onChange?: UseFormSetValue<FieldValues>;
}

const MultiChoice = ({ options, questionId, onChange }: SingleChoiceProps) => {
  const [valueState, setValueState] = useState<string[]>([]);
  if (!options) return <></>;

  const handleChange = (flag: boolean, value: string) => {
    const cloneState = JSON.parse(JSON.stringify(valueState));

    if (flag) {
      cloneState.push(value);
      setValueState(cloneState);
      onChange?.(questionId as string, cloneState.join(":::"));
    } else {
      const newState = cloneState.filter((i: string) => i !== value);
      setValueState(newState);
      onChange?.(questionId as string, newState.join(":::"));
    }
  };

  return (
    <>
      {options?.map((item, index) => (
        <Box key={index}>
          <Checkbox onChange={(e) => handleChange(e.target.checked, item)} />
          {item}
        </Box>
      ))}
    </>
  );
};

const Question = (props: Props) => {
  const { setValue } = useFormContext();
  const { t } = useTranslation();

  const renderTypeQuestion = () => {
    switch (props.type) {
      case QUESTION_TYPE.SINGLE_CHOICE:
        return;
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return (
          <MultiChoice
            onChange={setValue}
            questionId={props.questionId}
            options={[
              props?.option_1 || "",
              props?.option_2 || "",
              props?.option_3 || "",
              props?.option_4 || "",
            ]}
          />
        );
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
