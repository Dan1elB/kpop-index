import React, {useEffect, useState} from "react";
import { VectorMap } from "react-jvectormap";
import { getData } from "country-list";
import "./GlobalMap.css";


  const handleClick = (e, countryCode) => {
    console.log(countryCode);
  };

  const GlobalMap = () => {

    const [countryCodeStateObj,setCountryCodeObj] = useState({})

    useEffect(() => {
      const makeAPICall = async () => {
        const res = await fetch(
          'https://pomber.github.io/covid19/timeseries.json'
        );

       const json = await res.json();
        const countryCodes = getData().map(d => {
          if (json[d.name]) {
            d.stats = json[d.name].reverse()[0];
          }
          return d;
        });

        
        let countryCodeStats = {}
         countryCodes.map( country => {
          if(country.stats !== undefined) {
            return countryCodeStats[country.code] = country.stats.confirmed
          } else {
            return countryCodeStats[country.code] = 0
          }
        })
        setCountryCodeObj(countryCodeStats)
        
      };
      makeAPICall();
    }, []);

console.log(countryCodeStateObj)

    return (
    <>
    <VectorMap
        map={"world_mill"}
        markers={{
          US: { latLng: [37.9, -88.45], name: 'Some' },
          CO: { latLng:[4.624335, -74.063644],name:'Bogota'}
        }}
        backgroundColor="transparent"
        zoomOnScroll={true}
        onRegionClick={handleClick}
        onMarkerClick={(e)=> console.log(e)}
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0,
            cursor: "pointer"
          },
          hover: { 
            "fill-opacity": 0.8,
            cursor: "pointer"
          },
          selected: {
            fill: "#212121",
            stroke: "#212121",
            "stroke-width": 1,
          },
          selectedHover: {
            "fill-opacity": 0.8,
          }
        }}
        regionsSelectable={true}
        series={{
          regions: [
            {
              values: countryCodeStateObj,
              scale: ["#2155CD", "#79DAE8"],
              normalizeFunction: "polynomial"
            }
          ]
        }}
      />
    </>
  );
};

export default GlobalMap;