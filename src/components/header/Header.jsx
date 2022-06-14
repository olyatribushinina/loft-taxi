import React, { useEffect, useState } from 'react';
import Logo from './../../images/logo-header.svg';
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../actions/actions';
import { AppBar, Toolbar, Button, Container, Grid } from '@mui/material'
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';

const styles = theme => ({
	appbar: {
		minHeight: '102px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	button: {
		color: '#fff',
		textTransform: 'none',
		'&.active': {
			color: '#ffc617',
		},
	}
})

const Header = (props) => {

	const { isLoggedIn, logOut, setStorageAuth } = props;
	const { appbar, button } = props.classes;
	const exit = () => {
		logOut()
		let prop = {};
		setStorageAuth(prop)
		localStorage.removeItem('auth');
		localStorage.removeItem('userCardData');
		console.log(JSON.parse(localStorage.getItem('userCardData')))
	}

	return (
		<div data-testid="header">
			<AppBar className={appbar} color="secondary" position="static">
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
									<Button variant="text"><NavLink className={button} to="/map">Карта</NavLink></Button>
									<Button variant="text"><NavLink className={button} to="/profile">Профиль</NavLink></Button>
									<Button variant="text" onClick={exit} className={button}>Выйти</Button>
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

export default compose(
	connect(
		state => ({ isLoggedIn: state.auth.isLoggedIn }),
		{ logOut }
	),
	withStyles(styles),
)(Header);