import React from 'react';
import RegForm from '../../components/registration-form/RegForm';
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

function Reg(props) {
	return (
		<div data-testid="registration-page">
			<main className='maincontent'>
				<div className='container'>
					<h1>Регистрация</h1>
					<RegForm />
				</div>
			</main>
		</div>
	)
}

Reg.propTypes = {
	isLoggedIn: PropTypes.bool
}


export default connect(
	(state) => ({ isLoggedIn: state.auth.isLoggedIn }),
)(Reg);