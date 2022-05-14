import React from 'react';
import { LoginForm } from './../components/Forms'

function Login(props) {
	const { navigateTo } = props;

	return (
		<>
			<main className='maincontent'>
				<div className='container'>
					<h1>Логин</h1>
					<LoginForm navigateTo={navigateTo} />
				</div>
			</main>
		</>
	)
}

export default Login;