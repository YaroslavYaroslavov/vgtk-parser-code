import { useState } from "react";
import styled from "styled-components";
const Button = styled.button`
  background-color: ${(props) => (props.isToggled ? "lightgreen" : "honeydew")};
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const ToggleButton = ({ handleClick }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    handleClick();
    setIsToggled((prevState) => !prevState);
  };

  return (
    <Button isToggled={isToggled} onClick={handleToggle}>
      {isToggled ? "Ваш кабинет" : "Ваше расписание"}
    </Button>
  );
};
