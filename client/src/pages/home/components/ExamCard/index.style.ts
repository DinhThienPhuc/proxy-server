import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Styled = {
  CardWrapper: styled(NavLink)`
    position: relative;
    width: 100%;
    height: 160px;
    background: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #dedede;
    transition: ease-in-out 0.2s;
    &:hover {
      box-shadow: 2px 2px 16px #cdcdcd;
      transition: ease-in-out 0.2s;
    }
  `,
  CardNameContainer: styled.div`
    display:flex;
    justify-content: space-between;
    border-bottom: 1px solid #dedede;
    margin-bottom: 10px;
    color: #323232;
  `,
  CardName: styled.div` 
    font-size: 18px;
    font-weight: 600;
    width: calc(100% - 20px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  CardStatus: styled.div(({status = "pending"}: {status?: string}) => `
  color: ${status === "tested" ? "green" : "red"};
  font-size: 12px;
  text-align: right;
`),
  CardDescription: styled.div`
    font-size: 14px;
    color: #323232;
  `,
  CardScore: styled.div`
    font-size: 18px;
    font-weight: 600;
    width: 140px;
    text-align: right;
  `,
};

export default Styled;
