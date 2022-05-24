import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoib2x5YWJhZGdlciIsImEiOiJjbDNiM3R0bGwwOWhtM2hzNzM3OTIwZzhwIn0.Z3l9IZKmff94rMwL6IDrdA';

const MapBox = () => {
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

export default MapBox;

