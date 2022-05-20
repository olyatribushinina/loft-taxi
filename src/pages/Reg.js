import React from 'react';
import RegForm from './../components/RegForm';
import PropTypes from "prop-types";

function Reg(props) {
	const { navigateTo } = props;

	return (
		<>
			<main className='maincontent'>
				<div className='container'>
					<h1>Регистрация</h1>
					<RegForm navigateTo={navigateTo} />
				</div>
			</main>
		</>
	)
}

Reg.propTypes = {
	navigateTo: PropTypes.func
}

export default Reg;