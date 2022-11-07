/* PAGE STYLES: TEST
   ========================================================================== */

import ListItem from "@mui/material/ListItem";
import styled from "styled-components";

const Styled = {
  Container: styled.div`
    width: 100%;
    padding: 20px 200px;
  `,
  Summary: styled.div`
    width: 100%;
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
  `,
  Wrap: styled(ListItem)``,
};

export default Styled;
