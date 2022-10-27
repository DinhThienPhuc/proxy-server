import { RadioGroup } from "@mui/material";
import styled from "styled-components";

const Styled = {
  QuestionContainer: styled.div`
    width: 80%;
    margin: 0 auto 20px;
    padding: 20px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    min-height: 200px;
  `,
  QuestionTitle: styled.div``,
  QuestionNo: styled.span`
    font-weight: 600;
  `,
  RadioGroupContainer: styled(RadioGroup)`
    margin-left: 12px;
  `
};

export default Styled;