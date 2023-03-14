import React, {useState, useEffect} from "react";
import {sortBy, reverse, path} from "ramda";
import NumberFormat from 'react-number-format';
import { getData } from "country-list";
import GlobalMap from "../GlobalMap/GlobalMap";
import "./GlobalData.css";

const GlobalData = () => {
  const [covidData, setCovidData] = useState([])
  useEffect(() => {
    fetch('https://pomber.github.io/covid19/timeseries.json')
    .then(res => res.json())
    .then(res => getData().map(d => {
        if (res[d.name]) {
          d.stats = res[d.name].reverse()[0];
        }
        return d;
      }))
      .then(data => setCovidData(reverse(sortBy(path(["stats", "confirmed"]), data))))
  }, [])

  return (
    <div>
      <GlobalMap covidData={covidData} />
    </div>
) 
}
export default GlobalData;
