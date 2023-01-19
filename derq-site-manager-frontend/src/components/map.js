import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import ReactGoogleAutocomplete from 'react-google-autocomplete';
//Geocode.setApiKey("AIzaSyBECJoOSF56RuusCcu-DbgoGa2ECgfOlxM");
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.enableDebug();
class Map extends React.Component{
constructor( props ){
  super( props );
  this.state = {
   address: '',
   city: '',
   area: '',
   state: '',
   mapPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
   },
   markerPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
}
  }
 }

getTimezone = async (lat, long) => {
  let res = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810%2C-119.6822510&timestamp=1331161200&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
  let response = await res.json();
  console.log(response["timeZoneName"]);
  return response["timeZoneName"];
}

/**
  * Get the current address from the default map position and set those values in the state
  */
 async componentDidMount() {
  Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
   response => {
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray );
  
    console.log( 'city', city, area, state );
  
    this.setState( {
     address: ( address ) ? address : '',
     area: ( area ) ? area : '',
     city: ( city ) ? city : '',
     state: ( state ) ? state : '',
    } )

    this.props.setSiteName(this.state.address);
   },
   error => {
    console.error(error);
   }
  );

  let tz = await this.getTimezone(this.state.mapPosition.lat , this.state.mapPosition.lng)

  this.props.setTimezone(tz);
 };
/**
  * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
  *
  * @param nextProps
  * @param nextState
  * @return {boolean}
  */
 shouldComponentUpdate( nextProps, nextState ){
  if (
   this.state.markerPosition.lat !== this.props.center.lat ||
   this.state.address !== nextState.address ||
   this.state.city !== nextState.city ||
   this.state.area !== nextState.area ||
   this.state.state !== nextState.state
  ) {
   return true
  } else if ( this.props.center.lat === nextProps.center.lat ){
   return false
  }
 }
/**
  * Get the city and set the city input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getCity = ( addressArray ) => {
  let city = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
    city = addressArray[ i ].long_name;
    return city;
   }
  }
 };
/**
  * Get the area and set the area input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getArea = ( addressArray ) => {
  let area = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0]  ) {
    for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
     if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
      area = addressArray[ i ].long_name;
      return area;
     }
    }
   }
  }
 };
/**
  * Get the address and set the address input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getState = ( addressArray ) => {
  let state = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   for( let i = 0; i < addressArray.length; i++ ) {
    if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
     state = addressArray[ i ].long_name;
     return state;
    }
   }
  }
 };
/**
  * And function for city,state and address input
  * @param event
  */
 onChange = async ( event ) => {
  this.setState({ [event.target.name]: event.target.value });
  this.props.setSiteName(this.state.address);
  let tz = await this.getTimezone(this.state.markerPosition.lat , this.state.markerPosition.lng);
  this.props.setTimezone(tz);
 };
/**
  * This Event triggers when the marker window is closed
  *
  * @param event
  */
 onInfoWindowClose = ( event ) => {
};

/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
 onMarkerDragEnd = async ( event ) => {
    let newLat = event.latLng.lat(),
        newLng = event.latLng.lng();

    Geocode.fromLatLng( newLat , newLng ).then(
        response => {
          console.log(response);
            const address = response.results[0].formatted_address,
                  addressArray =  response.results[0].address_components,
                  city = this.getCity( addressArray ),
                  area = this.getArea( addressArray ),
                  state = this.getState( addressArray );
            this.setState( {
                address: ( address ) ? address : '',
                area: ( area ) ? area : '',
                city: ( city ) ? city : '',
                state: ( state ) ? state : '',
                markerPosition: {
                    lat: newLat,
                    lng: newLng
                },
                mapPosition: {
                    lat: newLat,
                    lng: newLng
                },
            } )
            this.props.setSiteName(this.state.address);
        },
        error => {
            console.error(error);
        }
    );

    let tz = await this.getTimezone(newLat , newLng);
    this.props.setTimezone(tz);
};

/**
	 * When the user types an address in the search box
	 * @param place
	 */
 onPlaceSelected = async ( place ) => {
    console.log( 'plc', place );
    const address = place.formatted_address,
          addressArray =  place.address_components,
          city = this.getCity( addressArray ),
          area = this.getArea( addressArray ),
          state = this.getState( addressArray ),
          latValue = place.geometry.location.lat(),
          lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
        address: ( address ) ? address : '',
        area: ( area ) ? area : '',
        city: ( city ) ? city : '',
        state: ( state ) ? state : '',
        markerPosition: {
            lat: latValue,
            lng: lngValue
        },
        mapPosition: {
            lat: latValue,
            lng: lngValue
        },
    })
    this.props.setSiteName(this.state.address);
    let tz = await this.getTimezone(this.state.markerPosition.lat , this.state.markerPosition.long);
    this.props.setTimezone(tz);
};

render(){
const AsyncMap = withScriptjs(
   withGoogleMap(
    props => (
     <GoogleMap 
     google={this.props.google}
     setApiKey
    //googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDEXpis-gAhBqCHzjCrhszZ5d3D815FP3o"
      defaultZoom={this.props.zoom}
      defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
     >
        {/* InfoWindow on top of marker */}
						<InfoWindow
							onClose={this.onInfoWindowClose}
							position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
							</div>
						</InfoWindow>
        {/*Marker*/}
						<Marker google={this.props.google}
						        name={'Dolores park'}
						        draggable={true}
						        onDragEnd={ this.onMarkerDragEnd }
						        position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
						/>
						<Marker />
                        {/* For Auto complete Search Box */}
						<ReactGoogleAutocomplete
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '2px',
								marginBottom: '500px'
							}}
							onPlaceSelected={ this.onPlaceSelected }
							types={['(regions)']}
						/>
</GoogleMap>
)
   )
  );
let map;
  if( this.props.center.lat !== undefined ) {
   map = <div>
     <div>
      <div className="flex">
      <div className="form-group w-1/2 mr-2">
       <label htmlFor="" className="form-labelb text-gray-700 text-b1">City</label>
       <input type="text" name="city" onChange={ this.onChange } readOnly="readOnly" value={ this.state.city } className="mt-1.5 form-control border border-1 rounded-lg w-full px-4 py-2.5 text-b2 focus:outline-none text-breen-lightGray"/>
      </div>
      <div className="form-group w-1/2">
       <label htmlFor="" className="form-labelb text-gray-700 text-b1">Area</label>
       <input type="text" name="area" onChange={ this.onChange } readOnly="readOnly" value={ this.state.area } className="mt-1.5 form-control border border-1 rounded-lg w-full px-4 py-2.5 text-b2 focus:outline-none text-breen-lightGray"/>
      </div>
      </div>
      <div className="form-group">
       <label htmlFor="" className="form-labelb text-gray-700 text-b1">State</label>
       <input type="text" name="state" onChange={ this.onChange } readOnly="readOnly" value={ this.state.state } className="mt-1.5 form-control border border-1 rounded-lg w-full px-4 py-2.5 text-b2 focus:outline-none text-breen-lightGray"/>
      </div>
      <div className="form-group">
       <label htmlFor="" className="form-labelb text-gray-700 text-b1">Address</label>
       <input type="text" name="address" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address } className="mt-1.5 form-control border border-1 rounded-lg w-full px-4 py-2.5 text-b2 focus:outline-none text-breen-lightGray"/>
      </div>
     </div>
     <div className='mt-4'>
     <AsyncMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
      loadingElement={
       <div style={{ height: `100%` }} />
      }
      containerElement={
       <div style={{ height: this.props.height }} />
      }
      mapElement={
       <div style={{ height: `100%` }} />
      }
     />
     </div>
    </div>
} else {
   map = <div style={{height: this.props.height}} />
  }
  return( map )
 }
}
export default Map