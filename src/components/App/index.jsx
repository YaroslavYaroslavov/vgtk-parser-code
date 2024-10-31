import { getVGTK } from "../../helpers/getVGTK";
import { useEffect, useState } from "react";
import { urlToday, urlTommorow } from "../../consts/url";
import { CustomInput } from "../Inputs";
import { CustomSelect } from "../Selects";
import { Checkbox } from "../Checkboxes";
import { v4 as uuidv4 } from "uuid";
import { useCallback } from "react";
import { lessonsTime } from "../../consts/timeSchedule";
import {
  TarificationWrapper,
  AddPanel,
  LessonWrapper,
  LessonName,
  Tarification,
  AppWrapper,
  GroupName,
  CheckboxWrapper,
  FormButton,
  FormButtonDelete,
  DateSchedule,
  MyCabinetInput,
  MyCabinetInputWrapper,
  HeaderSchedule,
  CabinetNumber,
} from "./styled";
import { ToggleButton } from "../ToggleButton";

function App() {
  const [schedule, setSchedule] = useState([]);
  const [mySchedule, setMySchedule] = useState([]);
  const [myCabinetLectures, setMyCabinetLectures] = useState([]);
  const [dateSchedule, setDateSchedule] = useState("Пожалуйста подождите");
  const [inputLessonValue, setInputLessonValue] = useState("");
  const [selectGroupValue, setSelectGroupValue] = useState("");
  const [checkboxLect, setCheckboxLect] = useState(false);
  const [checkboxLab, setCheckboxLab] = useState(false);
  const [userTarification, setUserTarification] = useState(
    JSON.parse(localStorage.getItem("userTarification")) || []
  );
  const [showTarification, setShowTarification] = useState(false);
  const [isUrlToday, setIsUrlToday] = useState(false);
  const [isCabinetMode, setIsCabinetMode] = useState(false);

  const onLessonInputChange = (event) => {
    // console.log(event.target.value)
    setInputLessonValue(event.target.value);
    // setInputLessonValue(event.value);
  };

  const handleCheckboxLab = () => {
    setCheckboxLab((prev) => !prev);
  };
  const handleCheckboxLect = () => {
    setCheckboxLect((prev) => !prev);
  };

  const handleSelectGroup = (event) => {
    setSelectGroupValue(event.target.value);
  };

  const addGroup = () => {
    const isDuplicate = userTarification.some(
      (group) =>
        group.groupName === selectGroupValue &&
        group.lesson === inputLessonValue
    );

    if (isDuplicate) {
      console.log("Группа с таким названием и уроком уже существует!");
    } else {
      const newGroup = {
        id: uuidv4(),
        groupName: selectGroupValue,
        lesson: inputLessonValue,
        lecture: checkboxLect,
        labs: checkboxLab,
      };

      setUserTarification((prev) => [...prev, newGroup]);

      localStorage.setItem(
        "userTarification",
        JSON.stringify([...userTarification, newGroup])
      );
      filterSchedule();
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addGroup();
  };

  const filterSchedule = useCallback(() => {
    const newSchedule = [];

    userTarification.forEach((item) => {
      const { groupName, lesson, labs, lecture } = item;

      const scheduleItem = schedule.find(
        (schedule) =>
          schedule.groupName === groupName &&
          schedule.lessons.some(
            (l) =>
              l.lessonName === lesson &&
              ((labs && l.isLab) || (!l.isLab && lecture))
          )
      );

      if (scheduleItem) {
        newSchedule.push(
          ...scheduleItem.lessons.filter((l) => l.lessonName === lesson)
        );
      }
    });
    // console.log(newSchedule);
    newSchedule.sort();
    setMySchedule(
      newSchedule.sort(
        (a, b) => parseFloat(a.lessonNumber) - parseFloat(b.lessonNumber)
      )
    );
    // scheduleMode ? drawSchedsule(newSchedule) : drawSchedule(myCabinetLectures);
  }, [schedule, userTarification]);

  const handleDelete = (id) => {
    const updatedTarification = userTarification.filter((el) => el.id !== id);
    setUserTarification(updatedTarification);
    localStorage.setItem(
      "userTarification",
      JSON.stringify(updatedTarification)
    );

    filterSchedule();
  };

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedSchedule, fetchedMyCabinetLectures, dateSchedule] =
        await getVGTK(isUrlToday ? urlToday : urlTommorow, "321");
      setSchedule(fetchedSchedule);
      setMyCabinetLectures(fetchedMyCabinetLectures);
      setDateSchedule(dateSchedule);
      // filterSchedule();
    };

    fetchData();
  }, [isUrlToday]);

  useEffect(() => {
    filterSchedule();
  }, [schedule, myCabinetLectures, userTarification, filterSchedule]);

  return (
    <AppWrapper>
      <DateSchedule
        onClick={() => {
          setIsUrlToday((prev) => !prev);
        }}
      >
        {dateSchedule}
      </DateSchedule>
      <Tarification>
        <AddPanel onSubmit={handleFormSubmit} action="">
          <CustomInput
            handleInputChange={onLessonInputChange}
            inputValue={inputLessonValue}
          ></CustomInput>
          <CustomSelect handleSelectChange={handleSelectGroup}></CustomSelect>
          <CheckboxWrapper>
            <Checkbox
              label={"Лабораторные"}
              handleCheckBoxChange={handleCheckboxLab}
            ></Checkbox>

            <Checkbox
              label={"Лекции"}
              handleCheckBoxChange={handleCheckboxLect}
            ></Checkbox>
          </CheckboxWrapper>
          {/* {schedule.map((el, index) => (
        <div key={index}>{el.groupName}</div>
      ))} */}
          <FormButton type="submit">Добавить</FormButton>
          <FormButton
            onClick={() => {
              setShowTarification((prev) => !prev);
            }}
            type="button"
          >
            Редактировать
          </FormButton>
        </AddPanel>
        {showTarification && (
          <>
            Ваша тарификация:
            {userTarification.map((el) => (
              <TarificationWrapper
                // style={{ display: "flex", gap: "20px" }}
                key={el.id}
              >
                <LessonName>{el.lesson}</LessonName>
                <GroupName>{el.groupName}</GroupName>
                <p>Лаб. {el.labs ? "Есть" : "Нет"}</p>
                <p>Лекции {el.lecture ? "Есть" : "Нет"}</p>
                {/* <button>Редактировать</button> */}
                <FormButtonDelete onClick={() => handleDelete(el.id)}>
                  Удалить
                </FormButtonDelete>
              </TarificationWrapper>
            ))}
          </>
        )}
      </Tarification>

      <div>
        <HeaderSchedule>
          <MyCabinetInputWrapper>
            <MyCabinetInput type="text" placeholder="Ваш кабинет" />
            <div>+</div>
          </MyCabinetInputWrapper>
          <div>
            <ToggleButton
              handleClick={() => {
                setIsCabinetMode((prev) => !prev);
              }}
            ></ToggleButton>
            {/* <SwitchBtn></SwitchBtn> */}
          </div>
        </HeaderSchedule>

        {!isCabinetMode &&
          mySchedule.map((el) => (
            <LessonWrapper key={el.lessonNumber}>
              <CabinetNumber>{el.lessonNumber}</CabinetNumber>
              <LessonName>{lessonsTime[el.lessonNumber]}</LessonName>
              <LessonName>{el.lessonName}</LessonName>
              <GroupName>{el.groupName}</GroupName>
              <CabinetNumber>{el.cabinet}</CabinetNumber>
            </LessonWrapper>
          ))}
        {isCabinetMode &&
          myCabinetLectures.map((el) => (
            <LessonWrapper key={el.lessonNumber}>
              <CabinetNumber>{el.lessonNumber}</CabinetNumber>
              <LessonName>{lessonsTime[el.lessonNumber]}</LessonName>
              <LessonName>{el.lessonName}</LessonName>
              <GroupName>{el.groupName}</GroupName>
              <CabinetNumber>{el.cabinet}</CabinetNumber>
            </LessonWrapper>
          ))}
      </div>
    </AppWrapper>
  );
}

export default App;
