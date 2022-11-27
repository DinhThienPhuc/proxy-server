import styled from "styled-components";

const Styled = {
  LoginContainer: styled.div`
    width: 80%;
    margin: auto;
    padding: 50px 0;
  `,
  FormContainer: styled.form`
    display: flex;  
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  SignUpButton: styled.button`
   width: 222.45px;
   height: 40px;
   cursor: pointer;
   margin-bottom: 10px;
  `,
  Title: styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 36px;
    margin-bottom: 24px;
  `,
  LoginButton: styled.button`
    width: 222.45px;
    height: 40px;
    margin: 10px;
    cursor: pointer;
  `,
  Errors: styled.div`
    color: red;
  `
};

export default Styled;