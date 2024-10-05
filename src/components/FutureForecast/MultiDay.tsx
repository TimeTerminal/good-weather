import React from "react";
import styled from "styled-components";

import SingleDay from "./SingleDay";
import { RESPONSIVE_SIZES } from "../../constants";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  background: rgba(2, 20, 46, 0.5);
  border-radius: 8px;
  box-shadow: rgba(1, 22, 66, 0) 10px 0.07em 0.07em,
    rgba(1, 22, 66, 0.25) 0px 0.125em 0.5em,
    rgba(1, 22, 66, 0) 0px 0px 0px 1px inset;

  @media (max-width: 560px) {
    width: 100%;
  }
`;

const SectionTitle = styled.h4<ThemableElement>`
  margin: 0;
  color: var(
    --${({ $isDarkTheme }) => ($isDarkTheme ? "text" : "lightModeText")}
  );
  font-size: 1.2em;
  font-weight: normal;
`;

const ScrollableDiv = styled.div`
  width: max-content;

  @media (max-width: 560px) {
    justify-content: left;
    width: 100%;
    overflow-x: scroll;
  }
`;

const MultiDayContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  @media (max-width: ${RESPONSIVE_SIZES.TABLET}px) {
    justify-content: left;
  }
`;

const createDate = (apiDate: string, viewportWidth: number) => {
  const dateObj = new Date(apiDate);

  const day = dateObj.getDay();
  const date = dateObj.toLocaleString("en-US", {
    month: viewportWidth > RESPONSIVE_SIZES.MOBILE ? "short" : "2-digit",
    day: "numeric",
  });

  return { date, day };
};

const renderAllColumns = ({
  fiveDayData,
  viewportWidth,
  ...props
}: {
  fiveDayData: SingleDayData[];
  viewportWidth: number;
}) => {
  const days = fiveDayData.map((dayData: SingleDayData, index: number) => {
    const {
      dt_txt,
      main: { temp_min, temp_max },
      pop,
      weather: {
        [0]: { main, description },
      },
    } = dayData;
    const { date, day } = createDate(dt_txt, viewportWidth);

    return (
      <SingleDay
        date={date}
        day={day}
        description={description}
        id={index}
        key={dt_txt}
        main={main}
        precipitationProbability={pop}
        tempDayLow={temp_min}
        tempDayHigh={temp_max}
        {...(props as MultiDay)}
      />
    );
  });

  return days;
};

const MultiDay: React.FC<MultiDay> = (props) => {
  return (
    <Section>
      <SectionTitle $isDarkTheme={props.isDarkTheme}>
        Daily forecast
      </SectionTitle>
      <ScrollableDiv>
        <MultiDayContainer>
          {!props.loading && renderAllColumns(props)}
        </MultiDayContainer>
      </ScrollableDiv>
    </Section>
  );
};

export default MultiDay;