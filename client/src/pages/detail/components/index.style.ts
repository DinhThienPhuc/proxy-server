import { InputBase, RadioGroup, TextField } from "@mui/material";
import styled from "styled-components";

const Styled = {
  QuestionContainer: styled.div`
    margin: 0 auto 20px;
    padding: 20px;
    border: 1px solid #cccccc;
    border-radius: 8px;
    min-height: 200px;
  `,
  QuestionTitle: styled.div``,
  QuestionNo: styled.span`
    font-weight: 600;
  `,
  RadioGroupContainer: styled(RadioGroup)`
    margin-left: 12px;
  `,
  InputText: styled(InputBase)`
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0 6px;
    margin-top: 8px;
  `
};

export default Styled;