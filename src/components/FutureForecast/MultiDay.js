import React from "react";
import styled from "styled-components";

import SingleDay from "./SingleDay";
import { RESPONSIVE_SIZES } from "../../constants";

const MultiDayContainer = styled.div`
  display: flex;
  justify-content: center;
  width: max-content;
  margin-top: 20px;
  padding: 20px;
  background: rgba(2, 20, 46, 0.5);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(0, 0, 0, 0.25) 0px 0px 0px 1px inset;

  @media (max-width: ${RESPONSIVE_SIZES.TABLET}px) {
    padding: 10px;
  }

  @media (max-width: 560px) {
    justify-content: left;
    width: 100%;
    overflow-x: scroll;
  }
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
