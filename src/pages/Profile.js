import React from 'react';
import Header from './../components/Header';
import PropTypes from "prop-types";

function Profile(props) {
	const { navigateTo } = props;

	return (
		<>
			<Header navigateTo={navigateTo} />
			<main className='maincontent'>
				<div className='container'>
					<h1>Профиль</h1>
				</div>
			</main>
		</>
	)
}

Profile.propTypes = {
	navigateTo: PropTypes.func
}

export default Profile;