import React, { useRef, useEffect, useState } from 'react';
import { drawRoute } from './drawRoute';
import mapboxgl from 'mapbox-gl';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

mapboxgl.accessToken = 'pk.eyJ1Ijoib2x5YWJhZGdlciIsImEiOiJjbDNiM3R0bGwwOWhtM2hzNzM3OTIwZzhwIn0.Z3l9IZKmff94rMwL6IDrdA';

const MapBox = ({ coords }) => {
	const mapContainer = useRef(null);

	const [lng, setLng] = useState(30.3350986);
	const [lat, setLat] = useState(59.9342802);
	const [zoom, setZoom] = useState(14);

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom
		});

		map.on('load', () => {
			if (coords.length) {
				drawRoute(map, coords)
			}
		})

		return () => map.remove()

	}, [coords]);

	return (
		<div>
			<div data-testid="map" ref={mapContainer} className="map" />
		</div>
	);
};

MapBox.propTypes = {
	coords: PropTypes.array
}

export default connect(
	(state) => ({
		coords: state.route.coords
	})
)(MapBox);


