import { CheckBoxStyled } from "./styled";

export const Checkbox = ({ handleCheckBoxChange, label }) => {
  return (
    <label>
      <CheckBoxStyled>
        <div>{label}</div>
        <input onChange={handleCheckBoxChange} type="checkbox" />
      </CheckBoxStyled>
    </label>
  );
};
