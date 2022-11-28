import styled from "styled-components";

const Styled = {
  DetailContainer: styled.div`
    width: 80%;
    margin: auto;
    padding: 50px 0;
  `,
  FormContainer: styled.form`
    width: 60%;
    margin: auto;
    padding: 50px 0;
  `,
  TestName: styled.div`
    font-size: 36px;
    font-weight: bold;
  `,
  TestDescription: styled.div`
    font-size: 18px;
    margin: 16px auto;
  `,
  ButtonContainer: styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
  `,
  SubmitButton: styled.button`
    width: 120px;
    height: 50px;
    border: 2px solid white;
    background-color: #ff5858;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background-color: #d14545;
    }
  `,
  ReworkButton: styled.button`
    width: 120px;
    height: 50px;
    border: 2px solid white;
    background-color: #5878ff;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background-color: #4760cb;
    }
`,
  Score: styled.div`
    font-weight: bold;
    color: red;
`,
  BackButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    background-color: #ff5858;
    margin-bottom: 12px;
    border-radius: 8px;
    height: 30px;
    color: white;
    &:hover {
      background-color: #d14545;
    }
    border: none;
    cursor: pointer;
    p {
      margin-left: 6px;
    }
  `
};

export default Styled;