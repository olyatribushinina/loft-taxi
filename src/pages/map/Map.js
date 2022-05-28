import React from 'react';
import Header from '../../components/header/Header';
import MapBox from '../../components/mapbox/MapBox';
import PropTypes from "prop-types";
import { connect } from 'react-redux'


function Map(props) {
	return (
		<>
			<Header />
			<MapBox />
		</>
	)
}

Map.propTypes = {
	isLoggedIn: PropTypes.bool
}

export default connect(
	(state) => ({ isLoggedIn: state.auth.isLoggedIn })
)(Map);