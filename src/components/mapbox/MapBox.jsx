import React, { useRef, useEffect, useState } from 'react';
import { drawRoute } from './drawRoute';
import mapboxgl from 'mapbox-gl';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

mapboxgl.accessToken = 'pk.eyJ1Ijoib2x5YWJhZGdlciIsImEiOiJjbDNiM3R0bGwwOWhtM2hzNzM3OTIwZzhwIn0.Z3l9IZKmff94rMwL6IDrdA';

const MapBox = (props) => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(30.3350986);
	const [lat, setLat] = useState(59.9342802);
	const [zoom, setZoom] = useState(14);

	// Initialize map when component mounts

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});

		if (Object.keys(props.routePoints).length) {
			drawRoute(map, props.routePoints)
		}
	});

	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});


	});
	return (
		<div>
			<div ref={mapContainer} className='map-container' />
		</div>
	);
};

MapBox.propTypes = {
	routePoints: PropTypes.object
}

export default connect(
	(state) => ({
		routePoints: state.route.routePoints
	})
)(MapBox);


