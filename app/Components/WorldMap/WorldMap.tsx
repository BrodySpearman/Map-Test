'use client';
import styles from "./WorldMap.module.css";    
import React, { JSX, useCallback } from "react";
import { MapBrowserEvent } from "ol";
import { fromLonLat, toLonLat } from "ol/proj";
import "ol/ol.css";
import "rlayers/control/layers.css"
import type { RView } from "../../../node_modules/rlayers/dist/RMap";
import { createPortal } from "react-dom";
import ReactDOM from "react-dom";

import { RMap, ROSM, RControl, } from "rlayers";
import { Point } from "ol/geom";
import { Pointer } from "ol/interaction";
import LocModal from "../LocModal/LocModal";
import ClientModal from "../LocModal/clientModal";
import { create } from "domain";
import { set } from "ol/transform";

const origin = [2.364, 48.82];
const initial: RView = { center: fromLonLat(origin), zoom: 11 };

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
            console.log("Clicked at ", lonLat);

            setShowModal(true);
          },
          []
        )}
      >

        <ROSM />
        <RControl.RScaleLine />
        <RControl.RAttribution />
        <RControl.RZoomSlider />
        {showModal && (
          <ClientModal selector="#main"><LocModal /></ClientModal>
        )}
        
        
      </RMap>

      <div className={styles.locModal}></div>
    </React.Fragment>
  );  
}