import React from "react";
import styled from "styled-components";

import DayColumn from "./DayColumn";

const DayColumnsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  background: #292929;
  border-radius: 0 0 10px 10px;
`;

const renderAllColumns = (props) => {
  const days = [];

  props.fiveDayData.map((dayData, index) => {
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
        description={description}
        feelsLike={feels_like}
        id={index}
        main={main}
        precipitationProbability={pop}
        setSelectedDay={props.setSelectedDay}
        selectedDayId={props.selectedDayId}
        tempDayLow={temp_min}
        tempDayHigh={temp_max}
      />
    );
  });

  return days;
};

const DayColumns = (props) => {
  return <DayColumnsContainer>{renderAllColumns(props)}</DayColumnsContainer>;
};

export default DayColumns;
