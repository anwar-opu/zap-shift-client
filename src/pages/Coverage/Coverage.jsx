import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { useLoaderData } from "react-router";
import { useRef } from "react";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);
  console.log(serviceCenters);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;

    const found = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(location.toLowerCase()),
    );
    console.log(found);
    if (found) {
      const coord = [found.latitude, found.longitude];
      // console.log(coord);
      // go to the location 
      mapRef.current.flyTo(coord, 14);
    }
  };
  return (
    <div className="bg-white p-10 rounded-3xl my-10">
      <h2 className="text-3xl font-bold">We are available in 64 districts</h2>
      {/* search */}
      <div className="my-5">
        <form onSubmit={handleSearch}>
          <div className="join">
            <label className="input validator join-item rounded-l-3xl">
              <input name="location" type="text" placeholder="Search here" />
            </label>
            <div className="validator-hint hidden">District name here</div>

            <button className="btn btn-primary text-secondary rounded-r-3xl join-item">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* map */}
      <div className="border h-200">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-200"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <i className="font-bold">{center.district}</i> <br /> Service
                Area: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
