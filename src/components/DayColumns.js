import React from "react";
import styled from "styled-components";

import DayColumn from "./DayColumn";

const DayColumnsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const renderAllColumns = (fiveDayData) => {
  const days = [];

  fiveDayData.map((dayData) => {
    console.log('dayData :>> ', dayData);
    const {
      dt_txt,
      main: { feels_like, temp_min, temp_max },
      pop,
      weather: {
        [0]: { main, description },
      },
    } = dayData;
    const date = dt_txt.substring(5, 10).replace("-", "/");
    const day = new Date(dt_txt).getDay();

    days.push(
      <DayColumn
        key={dt_txt}
        date={date}
        day={day}
        dayLow={temp_min}
        dayHigh={temp_max}
        description={description}
        feelsLike={feels_like}
        main={main}
        precipitationProbability={pop}
      />
    );
  });

  return days;
};

const DayColumns = (props) => {
  return (
    <DayColumnsContainer>
      {renderAllColumns(props.fiveDayData)}
    </DayColumnsContainer>
  );
};

export default DayColumns;
