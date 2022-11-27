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
    width: 200px;
    height: 35px;
    color: gray;
    outline: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    color: #323232;
    margin-right: 10px;
  `,
  SearchInput: styled(Input)``,
  OptionItem: styled(MenuItem)`
    font-size: 14px;
  `,
  PaginationContainer: styled.div`
    display: flex;
    margin-top: 16px;
    justify-content: center;
  `,
  EmptyData: styled.div`
    text-align: center;
    font-style: italic;
  `
};

export default Styled;
