/* PAGE STYLES: HOME
   ========================================================================== */

import { Select, MenuItem, Input } from "@mui/material";
import styled from "styled-components";

const Styled = {
  Container: styled.div`
    width: 80%;
    margin: auto;
    padding: 50px 0;
  `,
  ListExams: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-gap: 16px;
    margin-top: 30px;
  `,
  FilterContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  FilterDropdown: styled.div`
    display: flex;
    align-items: center;
  `,
  FilterTitle: styled.div`
    font-size: 20px;
    font-weight: 700;
  `,
  FilterLabel: styled.div`
    margin-right: 12px;
    font-size: 14px;
  `,
  Filter: styled(Select)`
    width: 150px;
    height: 35px;
    background: white;
    color: gray;
    outline: none;
    cursor: pointer;
    border: 1px solid #dedede;
    font-size: 14px;
    border-radius: 4px;
    color: #323232;
  `,
  SearchInput: styled(Input)``,
  OptionItem: styled(MenuItem)`
    font-size: 14px;
  `
};

export default Styled;
