import { InputBase, RadioGroup, TextField } from "@mui/material";

import styled from "styled-components";

const Styled = {
  QuestionContainer: styled.div`
    margin: 0 auto 20px;
    padding: 20px;
    border: 1px solid #cccccc;
    border-radius: 8px;
    min-height: 150px;
  `,
  QuestionTitle: styled.div`
    word-break: break-all;
  `,
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
  `,
  MultiChoiceLabel: styled.span<{ disabled?: boolean }>`
    color: ${({ disabled }) => (disabled ? "rgba(0, 0, 0, 0.38)" : "")};
  `,
};

export default Styled;
