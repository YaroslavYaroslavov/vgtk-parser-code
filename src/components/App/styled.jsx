import styled from "styled-components";
export const TarificationWrapper = styled.div`
  display: flex;
  width: 600px;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  border-bottom: 1px solid lightpink;
`;
// export const lessonWrapper = styled.div`
// flex`;

export const AddPanel = styled.form`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 40px;
`;

export const LessonWrapper = styled.div`
  display: flex;
  width: 600px;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  border-bottom: 1px solid lightpink;
  /* gap: 100px; */
`;
export const LessonName = styled.div`
  width: 200px;
`;

export const Tarification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  justify-content: space-between;
  /* margin-top: 40px; */
  margin-bottom: 40px;
`;

export const LessonInput = styled.input`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  border-color: rgba(41, 37, 37, 1);
  border-radius: 5px;
  background: rgba(56, 50, 50, 1);
  outline-width: 0;
  /* margin */
  padding-right: 10px;
  padding-left: 10px;
  color: white;
  &:hover {
    background: #706464;
  }
`;

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GroupName = styled.div`
  width: 100px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const FormButton = styled.button`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  border-color: rgba(41, 37, 37, 1);
  border-radius: 5px;
  background: rgba(56, 50, 50, 1);
  outline-width: 0;
  /* margin */
  padding-right: 10px;
  padding-left: 10px;
  color: white;
  &:hover {
    background: #706464;
  }
`;
export const FormButtonDelete = styled.button`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  border-color: #180000;
  border-radius: 5px;
  background: rgba(56, 50, 50, 1);
  outline-width: 0;
  /* margin */
  padding-right: 10px;
  padding-left: 10px;
  color: white;
  &:hover {
    background: #706464;
  }
`;
export const DateSchedule = styled.button`
  font-size: 30px;
  margin-bottom: 20px;
  color: white;
  background-color: transparent;
  border: none;
`;

export const MyCabinetInput = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: none;
  background: rgba(56, 50, 50, 1);
  color: white;
  margin: 0;
  padding: 0;
  height: 40px;
  width: 150px;
  &:focus {
    outline-width: 0;
  }
`;
export const MyCabinetInputWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid;
  border-color: rgba(41, 37, 37, 1);
  border-radius: 5px;
  background: rgba(56, 50, 50, 1);
  outline-width: 0;
  /* margin */
  padding-right: 10px;
  padding-left: 10px;
  width: 170px;
`;

export const HeaderSchedule = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CabinetNumber = styled.div`
  width: 100px;
`;
