import React, { useEffect, useState } from 'react';
// import Button from '../button/Button';
import Logo from './../../logo.svg';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../actions/actions';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from '@material-ui/core/Toolbar';
import { ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const Header = ({ isLoggedIn, logOut, setStorageAuth }) => {
	// console.log(setStorage)
	const exit = () => {
		logOut()
		// console.log(isLoggedIn)
		let prop = {};
		setStorageAuth(prop)
		localStorage.removeItem('auth');
		localStorage.removeItem('userCardData');
		console.log(JSON.parse(localStorage.getItem('userCardData')))
	}

	return (
		<div data-testid="header">
			<AppBar className="header" color="primary" position="static">
				<Container maxWidth="xl">
					<Toolbar>
						<Grid container spacing={2}
							direction="row"
							justifyContent="center"
							alignItems="center">
							<Grid item xs={8}>
								<div className="logo">
									<img src={Logo} className="App-logo" alt="logo" />
								</div>
							</Grid>
							<Grid item xs={4}>
								<Grid container
									direction="row"
									justifyContent="flex-end">
									<Button variant="text"><Link className="btn btn_text" to="/map">Карта</Link></Button>
									<Button variant="text"><Link className="btn btn_text" to="/profile">Профиль</Link></Button>
									<Button variant="text" onClick={exit}>Выйти</Button>
								</Grid>
							</Grid>
						</Grid>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	)

}

Header.propTypes = {
	isLoggedIn: PropTypes.bool,
	logOut: PropTypes.func
}

export default connect(
	state => ({ isLoggedIn: state.auth.isLoggedIn }),
	{ logOut }
)(Header);