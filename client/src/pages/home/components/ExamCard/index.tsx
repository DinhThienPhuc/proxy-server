import Styled from "./index.style";
import { t } from "i18next";
import { useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

interface Props {
  description?: string;
  id?: string;
  name?: string;
  score?: string;
  status?: string;
  type?: string;
}

const ExamCard = ({ name, description, score, status, id }: Props) => {
  const examPathView = useMemo(() => {
    return `/exams/${id}?status=view`;
  }, [id]);

  const examPathTest = useMemo(() => {
    return `/exams/${id}?status=test`;
  }, [id]);

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
    <Styled.CardWrapper>
      <Styled.CardStatus status={status}>{statusText}</Styled.CardStatus>
      <Styled.CardNameContainer>
        <Styled.CardName title={name}>{name}</Styled.CardName>
        {scoreText}
      </Styled.CardNameContainer>
      <Styled.CardDescription>{description}</Styled.CardDescription>
      <Styled.ButtonGroup>
        <Styled.ButtonView to={examPathView}>
          <SearchIcon />
          <p>{t("homepage.view")}</p>
        </Styled.ButtonView>
        <Styled.ButtonTest to={examPathTest}>
          <SportsScoreIcon />
          <p>{t("homepage.test")}</p>
        </Styled.ButtonTest>
      </Styled.ButtonGroup>
    </Styled.CardWrapper>
  );
};

export default ExamCard;
