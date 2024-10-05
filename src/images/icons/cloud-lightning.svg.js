import React from "react";

const SVG = ({ stroke = "#fff" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-cloud-lightning"
  >
    <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
    <polyline points="13 11 9 17 15 17 11 23"></polyline>
  </svg>
);

export default SVG;
