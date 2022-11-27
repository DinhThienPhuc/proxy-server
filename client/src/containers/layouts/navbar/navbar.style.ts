/* LAYOUT NAVBAR COMPONENT STYLES
   ========================================================================== */

import styled from "styled-components";

const Styled = {
  Container: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background: #fff;
    box-shadow: inset 0px -1px 0px #f3f3f4;
    height: 50px;
    padding: 0 100px;
  `,
  Right: styled.div`
    display: flex;
    align-items: center;
  `,
  ThemeSwitcher: styled.div`
    margin-left: 20px;
  `,
  SignOutButton: styled.button`
    width: 100px;
    height: 30px;
    margin-left: 10px;
    outline: none;
    cursor: pointer;
    border: 1px solid grey;
    background-color: #ff5858;
    color: white;
    font-weight: 500;
    border-radius: 4px;
    &:hover {
        background-color: #d14545;
    }
  `
};

export default Styled;
