import React from "react";
import styled from "styled-components";

import DayColumn from "./DayColumn";

const DayColumnsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  margin-top: -100px;
  background: #292929;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 20px;
`;

const renderAllColumns = ({ fiveDayData, ...props }) => {
  const days = fiveDayData.map((dayData, index) => {
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

    return (
      <DayColumn
        key={dt_txt}
        date={date}
        day={day}
        description={description}
        feelsLike={feels_like}
        id={index}
        main={main}
        precipitationProbability={pop}
        tempDayLow={temp_min}
        tempDayHigh={temp_max}
        {...props}
      />
    );
  });

  return days;
};

const DayColumns = (props) => {
  return (
    <DayColumnsContainer>
      {!props.loading && renderAllColumns(props)}
    </DayColumnsContainer>
  );
};

export default DayColumns;
