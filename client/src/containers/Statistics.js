import React, { useEffect } from "react";
import skillService from "../services/skills";

const BOOKINGS_BUCKETS = {
  Cheap: 100,
  Normal: 200,
  Expensive: 100000000,
};

const Statistics = (props) => {
  useEffect(async () => {
    const response = await skillService.getAll();
    console.log(response);
  }, []);

  /*   const output = [];

  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((prev, current) => {
      if (current.price < BOOKINGS_BUCKETS[bucket]) return prev + 1;
      else return prev;
    }, 0);
    output[bucket] = filteredBookingsCount;
  }
  console.log(output);
 */
  return <h1>Hello. Welcome to stats.</h1>;
};

export default Statistics;
