import { Box, Checkbox, FormControlLabel, Radio } from "@mui/material";
import { FieldValues, UseFormSetValue, useFormContext } from "react-hook-form";
import { useMemo, useState } from "react";

import Styled from "./index.style";
import { useSearchParams } from "react-router-dom";
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
  value?: string;
  isRight?: boolean;
}

interface OptionObj {
  label?: string | number;
  value?: string | number;
}

interface QuestionChoiceProps {
  options?: OptionObj[];
  questionId?: string;
  onChange?: UseFormSetValue<FieldValues>;
  disabled?: boolean;
  value?: string;
  isRight?: boolean;
}

const MultiChoice = ({
  options,
  questionId,
  onChange,
  disabled,
  value,
  isRight,
}: QuestionChoiceProps) => {
  const [valueState, setValueState] = useState<string[]>([]);
  if (!options) return <></>;

  const handleChange = (flag: boolean, value?: string | number) => {
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

  const showIcon = (v?: string | number) => {
    if (isRight) {
      if (value?.split(":::").includes(String(v)))
        return <Styled.CheckedIcon />;
      return null;
    } else {
      if (value?.split(":::").includes(String(v))) return <Styled.ClosedIcon />;
      return null;
    }
  };

  return (
    <>
      {options?.map(
        (item, index) =>
          !!item?.value && (
            <Styled.MultiChoiceContainer key={index}>
              <Checkbox
                checked={value?.split(":::").includes(String(item?.label))}
                disabled={disabled}
                onChange={(e) => handleChange(e.target.checked, item?.label)}
              />
              <Styled.MultiChoiceLabel disabled={disabled}>
                {item?.value}
              </Styled.MultiChoiceLabel>
              <Styled.ShowIcon>{showIcon(item?.label)}</Styled.ShowIcon>
            </Styled.MultiChoiceContainer>
          ),
      )}
    </>
  );
};

const SingleChoice = ({
  options,
  questionId,
  onChange,
  disabled,
  value,
  isRight,
}: QuestionChoiceProps) => {
  if (!options) return <></>;

  const handleChange = (value?: string | number) => {
    onChange?.(questionId as string, value);
  };

  const showIcon = (v?: string | number) => {
    if (isRight) {
      if (v === value) return <Styled.CheckedIcon />;
      return null;
    } else {
      if (v === value) return <Styled.ClosedIcon />;
      return null;
    }
  };

  return (
    <Styled.RadioGroupContainer
      name={questionId}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    >
      {options?.map(
        (item, index) =>
          !!item?.value && (
            <Styled.FormControlLabelContainer>
              <FormControlLabel
                key={index}
                value={item?.label}
                control={<Radio />}
                label={item?.value}
                disabled={disabled}
              />
              <Box>{showIcon(item?.label)}</Box>
            </Styled.FormControlLabelContainer>
          ),
      )}
    </Styled.RadioGroupContainer>
  );
};

const MissingText = ({
  questionId,
  onChange,
  disabled,
  value,
  isRight,
}: QuestionChoiceProps) => {
  const { t } = useTranslation();
  const handleChange = (value: string) => {
    onChange?.(questionId as string, value);
  };

  const showIcon = () => {
    if (value) {
      if (isRight) return <Styled.CheckedIcon />;
      return <Styled.ClosedIcon />;
    }
    return null;
  };

  return (
    <Styled.InputTextContainer>
      <Styled.InputText
        value={value}
        disabled={disabled}
        name={questionId}
        placeholder={t("detail.missing_text")}
        onChange={(e) => handleChange(e.target.value)}
      />
      <span>{showIcon()}</span>
    </Styled.InputTextContainer>
  );
};

const Question = (props: Props) => {
  const { setValue } = useFormContext();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const isInViewMode = useMemo(() => {
    return searchParams.get("status") === "view";
  }, [searchParams]);

  const renderTypeQuestion = () => {
    switch (props.type) {
      case QUESTION_TYPE.SINGLE_CHOICE:
        return (
          <SingleChoice
            onChange={setValue}
            value={props?.value}
            questionId={props.questionId}
            isRight={props.isRight}
            options={[
              { value: props?.option_1 || "", label: "a" },
              { value: props?.option_2 || "", label: "b" },
              { value: props?.option_3 || "", label: "c" },
              { value: props?.option_4 || "", label: "d" },
            ]}
            disabled={isInViewMode}
          />
        );
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return (
          <MultiChoice
            onChange={setValue}
            value={props?.value}
            questionId={props.questionId}
            isRight={props.isRight}
            options={[
              { value: props?.option_1 || "", label: "a" },
              { value: props?.option_2 || "", label: "b" },
              { value: props?.option_3 || "", label: "c" },
              { value: props?.option_4 || "", label: "d" },
            ]}
            disabled={isInViewMode}
          />
        );
      case QUESTION_TYPE.FILL_MISSING_TEXT:
        return (
          <MissingText
            onChange={setValue}
            value={props?.value}
            questionId={props.questionId}
            disabled={isInViewMode}
            isRight={props.isRight}
          />
        );
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
