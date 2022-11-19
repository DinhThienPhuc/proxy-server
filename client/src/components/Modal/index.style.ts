import styled from "styled-components";

const Styled = {
  CloseButton: styled.div`
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 10px;
    &:hover {
        color: grey;
    }
 `,
  ModalContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`,
  ModalChildren: styled.div`
    position: relative;
    background: white;
    padding: 32px;
    border-radius: 8px;
    min-width: 300px;
    max-width: fit-content;
    min-height: 200px;  
`,
  ModalTitle: styled.div`
    font-weight: bold;
    font-size: 28px;
    text-align: center;
    word-break: break-word
`, 
  ModalDescription: styled.div`
    margin-top: 12px;
    font-size: 16px;
    text-align: center;
    word-break: break-word;
`,
  CancelButton: styled.button`
    margin-top: 4px;
    outline: none;
    width: 100%;
    border: none;
    color: #5878ff;
    cursor: pointer;
    border: 1px solid #5878ff;
    background-color: "white";
    border-radius: 8px;
    &:hover {
        background-color: #dedede;
    }
    height: 40px;
  `,
  OKButton: styled.button`
    margin-top: 10px;
    outline: none;
    border: none;
    width: 100%;
    color: white;
    height: 40px;
    cursor: pointer;
    background-color: #ff5858;
    border-radius: 8px;
    &:hover {
        background-color: #d14545;
    }
  `,
};

export default Styled;
