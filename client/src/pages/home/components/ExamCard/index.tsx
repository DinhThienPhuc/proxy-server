import { t } from "i18next";
import React from "react";
import Styled from "./index.style";

interface Props {
  description?: string;
  id?: string;
  name?: string;
  score?: string;
  status?: string;
  type?: string;
}

const ExamCard = ({ name, description, score, status, id }: Props) => {
  return (
    <Styled.CardWrapper to={`/exams/${id}`}>
      <Styled.CardStatus status={status}>
        {status === "tested"
          ? t("homepage.filter.tested")
          : t("homepage.filter.pending")}
      </Styled.CardStatus>
      <Styled.CardNameContainer>
        <Styled.CardName title={name}>{name}</Styled.CardName>
        {score ? <Styled.CardScore>{score}</Styled.CardScore> : null}
      </Styled.CardNameContainer>
      <Styled.CardDescription>{description}</Styled.CardDescription>
    </Styled.CardWrapper>
  );
};

export default ExamCard;
