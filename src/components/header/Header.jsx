import React from 'react';
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
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';


class Header extends React.Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool,
		logOut: PropTypes.func,
	}

	exit = () => {
		this.props.logOut()
		localStorage.removeItem('auth')
	}

	render() {
		let className = 'btn btn_text';
		return (
			// <div data-testid="header">
			// 	<header className="header">
			// 		<div className="container">
			// 			<div className="d-flex items-center">
			// 				<div className="logo">
			// 					<img src={Logo} className="App-logo" alt="logo" />
			// 				</div>
			// 				<nav className='nav d-flex items-center'>
			// 					<ul className='nav__list d-flex items-center'>
			// 						<li className='nav__item'>
			// 							<Link className="btn btn_text" to="/map">Карта</Link>
			// 						</li>
			// 						<li className='nav__item'>
			// 							<Link className="btn btn_text" to="/profile">Профиль</Link>
			// 						</li>
			// 						<li className='nav__item'>
			// 							<Button className={className} callBack={this.props.logOut} name="Выйти" />
			// 						</li>
			// 					</ul>
			// 				</nav>
			// 			</div>
			// 		</div>
			// 	</header>
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
										<Button variant="text" onClick={this.exit}>Выйти</Button>
									</Grid>
								</Grid>
							</Grid>
						</Toolbar>
					</Container>
				</AppBar>
			</div>
		)
	}
}

export default connect(
	state => ({ isLoggedIn: state.auth.isLoggedIn }),
	{ logOut }
)(Header);