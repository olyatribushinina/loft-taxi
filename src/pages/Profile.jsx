import React from 'react';
import Header from './../components/Header'

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

export default Profile;