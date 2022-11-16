import { InputBase, RadioGroup, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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
  FormControlLabelContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  InputTextContainer: styled.div`
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 10px
  `,
  InputText: styled(InputBase)`
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 0 6px;
  `,
  CheckedIcon: styled(CheckIcon)`
    color: green;
  `,
  ClosedIcon: styled(CloseIcon)`
    color: red;
  `,
  MultiChoiceContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  ShowIcon: styled.div`
    margin-left: 10px;
  `,
  MultiChoiceLabel: styled.span<{ disabled?: boolean }>`
    color: ${({ disabled }) => (disabled ? "rgba(0, 0, 0, 0.38)" : "")};
  `,
};

export default Styled;
