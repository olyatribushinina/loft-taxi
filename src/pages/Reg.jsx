import React from 'react';
import { RegForm } from './../components/Forms'

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

export default Reg;