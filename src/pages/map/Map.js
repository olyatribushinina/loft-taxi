import React from 'react';
import Header from '../../components/header/Header';
import MapBox from '../../components/mapbox/MapBox';
import PropTypes from "prop-types";
import { connect } from 'react-redux'


function Map(props) {
	return (
		<div data-testid="map-page">
			<Header />
			<MapBox />
			<div className='form form_route'>
				<form name="RouteForm">

				</form>
			</div>
		</div>
	)
}

Map.propTypes = {
	isLoggedIn: PropTypes.bool
}

export default connect(
	(state) => ({ isLoggedIn: state.auth.isLoggedIn })
)(Map);