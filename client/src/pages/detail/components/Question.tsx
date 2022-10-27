import { Box, Checkbox, FormControlLabel, Radio } from "@mui/material";
import { FieldValues, UseFormSetValue, useFormContext } from "react-hook-form";
import React, { useState } from "react";

import Styled from "./index.style";
import { useTranslation } from "react-i18next";

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
  option_1?: string | null;
  option_2?: string | null;
  option_3?: string | null;
  option_4?: string | null;
}

interface QuestionChoiceProps {
  options?: string[];
  questionId?: string;
  onChange?: UseFormSetValue<FieldValues>;
}

const SingleChoice = ({
  options,
  questionId,
  onChange,
}: QuestionChoiceProps) => {
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

const MultiChoice = ({
  options,
  questionId,
  onChange,
}: QuestionChoiceProps) => {
  const [valueState, setValueState] = useState<string[]>([]);
  if (!options) return <></>;

  const handleChange = (value: any) => {
    onChange?.(questionId as string, value);
  };

  return (
    <Styled.RadioGroupContainer
      name={questionId}
      onChange={(e) => handleChange(e.target.value)}
    >
      {options?.map((item, index) => (
        <FormControlLabel
          key={index}
          value={item}
          control={<Radio />}
          label={item}
        />
      ))}
    </Styled.RadioGroupContainer>
  );
};

const Question = (props: Props) => {
  const { setValue } = useFormContext();
  const { t } = useTranslation();

  const renderTypeQuestion = () => {
    switch (props.type) {
      case QUESTION_TYPE.SINGLE_CHOICE:
        return (
          <SingleChoice
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
