import React from "react";
import styled from "styled-components";

import SingleDay from "./SingleDay";
import { RESPONSIVE_SIZES } from "../../constants";

const MultiDayContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  background: #292929;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-top: 20px;
  padding: 20px;
`;

const renderAllColumns = ({ fiveDayData, viewportWidth, ...props }) => {
  const createDate = (apiDate) => {
    const dateObj = new Date(apiDate);

    const day = dateObj.getDay();
    const date = dateObj.toLocaleString("en-US", {
      month: viewportWidth > RESPONSIVE_SIZES.MOBILE ? "short" : "2-digit",
      day: "numeric",
    });

    return { date, day };
  };

  const days = fiveDayData.map((dayData, index) => {
    const {
      dt_txt,
      main: { feels_like, temp_min, temp_max },
      pop,
      weather: {
        [0]: { main, description },
      },
    } = dayData;
    const { date, day } = createDate(dt_txt);

    return (
      <SingleDay
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

const MultiDay = (props) => {
  return (
    <MultiDayContainer>
      {!props.loading && renderAllColumns(props)}
    </MultiDayContainer>
  );
};

export default MultiDay;
