import { LessonInput } from "../App/styled";

export const CustomInput = ({ handleInputChange, inputValue }) => {
  return (
    <div>
      <LessonInput
        required
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};
