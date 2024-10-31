import { allGroups } from "../consts/allGroups";

export const splitRowspan2TD = (tableElement) => {
  for (let i = 0; i < tableElement.rows.length; i++) {
    let row = tableElement.rows[i];
    for (let j = 0; j < row.cells.length; j++) {
      let cell = row.cells[j];
      if (
        cell.hasAttribute("rowspan") &&
        parseInt(cell.getAttribute("rowspan")) === 2
      ) {
        let newCell = cell.cloneNode(true);
        cell.removeAttribute("rowspan");
        newCell.removeAttribute("rowspan");
        if (row.nextElementSibling) {
          let nextRow = row.nextElementSibling;
          let nextCell = nextRow.insertCell(j);
          nextCell.innerHTML = newCell.innerHTML;
        }
      }
    }
  }
};

export const getVGTK = (url, myCabinet) => {
  let SCHEDULE = [];
  let MYCABINETLECTURES = [];

  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = data;
      const tableElement = tempElement.querySelector("table");
      const dateSchedule = tableElement.rows[0].innerText.trim();

      splitRowspan2TD(tableElement);

      for (let i = 0; i < tableElement.rows.length - 11; i++) {
        const row = tableElement.rows[i];
        if (row.cells.length > 1) {
          Array.from(row.cells).forEach((cell, j) => {
            let cellValue = cell.innerText.trim();
            if (allGroups.includes(cellValue)) {
              const groupSchedule = {
                groupName: cellValue,
                lessons: Array.from({ length: 11 }, (_, index) => ({
                  lessonName:
                    tableElement.rows[i + index + 1].cells[j]?.innerText.trim(),
                  cabinet:
                    tableElement.rows[i + index + 1].cells[
                      j + 1
                    ]?.innerText.trim(),
                  lessonNumber: index + 1,
                  groupName: cellValue,
                  isLab: tableElement.rows[i + index + 1].cells[
                    j + 1
                  ]?.innerText
                    .trim()
                    .includes("/"),
                })),
              };
              SCHEDULE.push(groupSchedule);

              groupSchedule.lessons.forEach((lesson) => {
                if (lesson.cabinet?.split("/").includes(myCabinet)) {
                  console.log(true);
                  MYCABINETLECTURES.push(lesson);
                }
              });
            }
          });
        }
      }
      //   console.log(SCHEDULE);

      return [SCHEDULE, MYCABINETLECTURES, dateSchedule];
    })
    .catch((error) => console.error("Ошибка:", error));
};
