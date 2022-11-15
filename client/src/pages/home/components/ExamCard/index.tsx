import Styled from "./index.style";
import { t } from "i18next";
import { useMemo } from "react";

interface Props {
  description?: string;
  id?: string;
  name?: string;
  score?: string;
  status?: string;
  type?: string;
}

const ExamCard = ({ name, description, score, status, id }: Props) => {
  const examPath = useMemo(() => {
    return `/exams/${id}?status=${score ? "view" : "test"}`;
  }, [id, score]);

  const statusText = useMemo(() => {
    if (status === "tested") {
      return t("homepage.filter.tested");
    }
    return t("homepage.filter.pending");
  }, [status]);

  const scoreText = useMemo(() => {
    if (!score) {
      return null;
    }
    return <Styled.CardScore>{score}</Styled.CardScore>;
  }, [score]);

  return (
    <Styled.CardWrapper to={examPath}>
      <Styled.CardStatus status={status}>{statusText}</Styled.CardStatus>
      <Styled.CardNameContainer>
        <Styled.CardName title={name}>{name}</Styled.CardName>
        {scoreText}
      </Styled.CardNameContainer>
      <Styled.CardDescription>{description}</Styled.CardDescription>
    </Styled.CardWrapper>
  );
};

export default ExamCard;
