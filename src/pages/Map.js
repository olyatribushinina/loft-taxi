import React from 'react';
import Header from '../components/Header';
import MapBox from '../components/MapBox';
import PropTypes from "prop-types";

function Map(props) {
	const { navigateTo } = props;

	return (
		<>
			<Header navigateTo={navigateTo} />
			<MapBox />
		</>
	)
}

Map.propTypes = {
	navigateTo: PropTypes.func
}

export default Map;