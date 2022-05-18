import React from 'react';
import Header from '../components/Header';

function Map(props) {
	const { navigateTo } = props;

	return (
		<>
			<Header navigateTo={navigateTo} />
			<main className='maincontent'>
				<div className='container'>
					<h1>Карта</h1>
				</div>
			</main>
		</>
	)
}


export default Map;