import React from 'react';
import LoginForm from './../components/LoginForm';
import PropTypes from "prop-types";

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

Login.propTypes = {
	navigateTo: PropTypes.func
}

export default Login;