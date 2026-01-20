'use client';
import styles from "./WorldMap.module.css";
import PinIcon from "../../../public/PinIcon.svg";

import React, { JSX, useCallback } from "react";
import { MapBrowserEvent } from "ol";
import { Point } from "ol/geom";
import { fromLonLat, toLonLat } from "ol/proj";
import "ol/ol.css";
import "rlayers/control/layers.css"
import type { RView } from "../../../node_modules/rlayers/dist/RMap";
import dynamic from "next/dynamic";

import { RMap, ROSM, RControl, RLayerVector, RFeature, RStyle } from "rlayers";

const origin = [2.364, 48.82];
const initial: RView = { center: fromLonLat(origin), zoom: 11 };

// Dynamic import needed for Outside Client Component
const LocModal = dynamic(() => import("../LocModal/LocModal"), {
  ssr: false,
});

export default function WorldMap(): JSX.Element {
  const [loc, setLoc] = React.useState(origin);
  const [view, setView] = React.useState(initial);

  // Could maybe only need one of these states
  const [showModal, setShowModal] = React.useState(false);
  const [isPinned, dropPin] = React.useState(false);

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
            dropPin(true);

            console.log("location: ", lonLat);
          },
          []
        )}
      >
        <ROSM />
        <RControl.RScaleLine />
        <RControl.RAttribution />
        <RControl.RZoomSlider />

        {/* On click features */}
        {showModal && <LocModal coordinates={loc} />}
        {isPinned && (
          <RLayerVector>
            <RFeature geometry={new Point(fromLonLat(loc))}>
              <RStyle.RStyle>
                <RStyle.RIcon
                  src={PinIcon.src}
                  scale={.7}
                  anchor={[0.5, 1]}
                  
                />
              </RStyle.RStyle>
            </RFeature>
          </RLayerVector>
        )}

      </RMap>
    </React.Fragment>
  );  
}