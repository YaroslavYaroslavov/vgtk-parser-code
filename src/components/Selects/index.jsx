import { allGroups } from "../../consts/allGroups";
import { SelectStyled } from "./styled";

export const CustomSelect = ({ handleSelectChange, selectValue }) => {
  return (
    <SelectStyled
      type="text"
      required
      value={selectValue}
      onChange={handleSelectChange}
    >
      <option value="" disabled selected hidden>
        Группа
      </option>
      {allGroups.map((group) => (
        <option value={group} key={group}>
          {group}
        </option>
      ))}
    </SelectStyled>
  );
};
