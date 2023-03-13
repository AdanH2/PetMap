import { GoogleMap, LoadScript } from "@react-google-maps/api";

const Map = () => {

    const mapStyles = {        
        height: "100vh",
        width: "100%"
    };
      
    const defaultCenter = {
        lat: 45.51922, lng: -122.67717
    }

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
            />
        </LoadScript>
    )
}

export default Map;