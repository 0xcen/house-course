import { ReactElement, useRef, useState } from "react";
import Link from "next/link";
import { Image } from "cloudinary-react";
import ReactMapGL, {
  InteractiveMapProps,
  Marker,
  Popup,
  ViewState,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import { useLocalState } from "src/utils/useLocalState";
// import { HousesQuery_houses } from "src/generated/HousesQuery";
// import { SearchBox } from "./searchBox";

interface IProps {}

const Map = ({}: IProps) => {
  const mapRef = useRef<typeof ReactMapGL | null>(null);
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 52.50166977148537,
    longitude: 13.43206560618776,
    zoom: 12,
  });
  return (
    <div className="text-black relative">
      <ReactMapGL
        {...viewport}
        height="calc(100vh - 64px)"
        width="100%"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewStateChange={(nextViewport: ViewState) =>
          setViewport(nextViewport)
        }
        minZoom={5}
        maxZoom={15}
        ref={(instance) => {
          mapRef.current = instance;
        }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
      ></ReactMapGL>
    </div>
  );
};

export default Map;
