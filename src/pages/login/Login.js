import React from 'react';
import LoginForm from '../../components/login-form/LoginForm';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


function Login(props) {
	// console.log(props.history.location)
	return (
		<>
			<main className='maincontent'>
				<div className='container'>
					<h1>Логин</h1>
					{props.isLoggedIn ? (<Redirect to="/map" />) : (<LoginForm />)}
					{/* <LoginForm /> */}
				</div>
			</main>

		</>
	)
}

Login.propTypes = {
	isLoggedIn: PropTypes.bool
}

export default connect(
	state => ({ isLoggedIn: state.auth.isLoggedIn })
)(Login);