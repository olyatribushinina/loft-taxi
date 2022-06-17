import React from 'react';
import Logo from './../../images/logo-header.svg';
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut, resetRouteData } from '../../actions/actions';
import { AppBar, Toolbar, Button, Container, Grid } from '@mui/material';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { slide as Menu } from "react-burger-menu";
import MapIcon from '../../images/header-icons/map.svg';
import ProfileIcon from '../../images/header-icons/profile.svg';
import ExitIcon from '../../images/header-icons/exit.svg';
import { Box } from '@mui/system';

const styles = theme => ({
	appbar: {
		minHeight: '102px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	buttonDesk: {
		color: '#fff',
		textTransform: 'none',
		'&.active': {
			color: '#ffc617',
		},
	},
	buttonMobile: {
		color: '#000',
		textTransform: 'none',
		'&.active': {
			color: '#ffc617',
		},
	}
})

const Header = (props) => {
	const { logOut, resetRouteData } = props;
	const { appbar, buttonMobile, buttonDesk } = props.classes;

	const handleExit = () => {
		logOut();
		resetRouteData();
		localStorage.clear();
		// console.log(localStorage)
	}

	return (
		<div data-testid="header">
			<Menu {...props}>
				<Box style={{ display: 'flex', alignItems: 'center' }}>
					<img src={MapIcon} alt='Map Icon' />
					<Button variant="string"><NavLink className={buttonMobile} to="/map">Карта</NavLink></Button>
				</Box>
				<Box style={{ display: 'flex', alignItems: 'center' }}>
					<img src={ProfileIcon} alt='Profile Icon' />
					<Button variant="string"><NavLink className={buttonMobile} to="/profile">Профиль</NavLink></Button>
				</Box>
				<Box style={{ display: 'flex', alignItems: 'center' }}>
					<img src={ExitIcon} alt='Exit Icon' />
					<Button
						variant="string"
						onClick={logOut}
						className={buttonMobile}
					>Выйти</Button>
				</Box>
			</Menu>

			<AppBar className={appbar} color="secondary" position="static">
				<Container maxWidth="none" style={{ padding: '0' }}>
					<Toolbar>
						<Grid container spacing={2}
							direction="row"
							justifyContent="center"
							alignItems="center">
							<Grid item xs={6}>
								<div className="logo">
									<img src={Logo} className="App-logo" alt="logo" />
								</div>
							</Grid>
							<Grid item xs={6}>
								<Grid container
									direction="row"
									justifyContent="flex-end">
									<Button variant="string"><NavLink className={buttonDesk} to="/map">Карта</NavLink></Button>
									<Button variant="string"><NavLink className={buttonDesk} to="/profile">Профиль</NavLink></Button>
									<Button
										variant="string"
										onClick={handleExit}
										className={buttonDesk}
									>
										Выйти
									</Button>
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
		{ logOut, resetRouteData }
	),
	withStyles(styles),
)(Header);