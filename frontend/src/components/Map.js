import { GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import { useState, React, useMemo } from "react";

const Map = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const [ map, setMap ] = useState(/** @type google.maps.Map */ (null));
    
    const mapStyles = {        
        height: "100vh",
        width: "100%"
    };
      
    const defaultCenter = useMemo(() => ({lat: 45.51922, lng: -122.67717}), []);

    const addMarker = (position) => {
        //eslint-disable-next-line
        if (confirm("Would you like to add a marker here?")){
            //eslint-disable-next-line
            const marker = new google.maps.Marker({ position: position, map: map});
            map.panTo(position);
        }
        // const location = {
        //     location: position.toJSON(),
        // };
        // locations.push(location);
        // console.log(locations);
    }

    if (!isLoaded){
        return <div>Loading...</div>
    } else {
        return (
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
                onLoad={(map) => setMap(map)}
                onClick={(e) => addMarker(e.latLng)}
            >
                <MarkerF position={defaultCenter} />
            </GoogleMap>
        )
    }

    // return (
    //     <LoadScript
    //         googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    //         <GoogleMap
    //             mapContainerStyle={mapStyles}
    //             zoom={13}
    //             center={defaultCenter}
    //         >
    //         </GoogleMap>
    //     </LoadScript>
    // )
}

export default Map;