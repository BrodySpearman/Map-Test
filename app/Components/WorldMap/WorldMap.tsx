'use client';
import styles from "./WorldMap.module.css";    
import React, { JSX, useCallback } from "react";
import { MapBrowserEvent } from "ol";
import { fromLonLat, toLonLat } from "ol/proj";
import "ol/ol.css";
import "rlayers/control/layers.css"
import type { RView } from "../../../node_modules/rlayers/dist/RMap";
import dynamic from "next/dynamic";

import { RMap, ROSM, RControl, } from "rlayers";

const origin = [2.364, 48.82];
const initial: RView = { center: fromLonLat(origin), zoom: 11 };

const LocModal = dynamic(() => import("../LocModal/LocModal"), {
  ssr: false,
});

export default function WorldMap(): JSX.Element {
  const [loc, setLoc] = React.useState(origin);
  const [view, setView] = React.useState(initial);
  const [showModal, setShowModal] = React.useState(false);

  return (

    <React.Fragment>
      <RMap 
        className="z-0 w-full h-screen" 
        initial={initial}
        view={[view, setView]}
        noDefaultControls={true}
        onClick={useCallback(
          (e: MapBrowserEvent<PointerEvent | KeyboardEvent | WheelEvent>) => {
            const coord = e.map.getCoordinateFromPixel(e.pixel);
            const lonLat = toLonLat(coord);
            setLoc(lonLat);
            setShowModal(true);
            console.log("Clicked at ", lonLat);
          },
          []
        )}
      >

        <ROSM />
        <RControl.RScaleLine />
        <RControl.RAttribution />
        <RControl.RZoomSlider />
        {showModal && <LocModal coordinates={loc} />}
        
      </RMap>
    </React.Fragment>
  );  
}