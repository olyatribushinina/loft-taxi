import React from 'react';
import LoginForm from '../../components/login-form/LoginForm';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

function Login(props) {
	return (
		<div data-testid="login-page">
			<main className='maincontent'>
				<div className='container'>
					<h1>Логин</h1>
					<LoginForm />
				</div>
			</main>
		</div>
	)
}

Login.propTypes = {
	isLoggedIn: PropTypes.bool
}

export default connect(
	state => ({ isLoggedIn: state.auth.isLoggedIn })
)(Login);