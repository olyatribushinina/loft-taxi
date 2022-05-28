import React from 'react';
import Button from '../button/Button';
import Logo from './../../logo.svg';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../actions';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool
	}

	unauthenticate = (e) => {
		e.preventDefault();
		this.props.logOut();
	};

	render() {
		let className = 'btn btn_text';
		console.log(this.props.history)
		return (
			<>
				<header className="header">
					<div className="container">
						<div className="d-flex items-center">
							<div className="logo">
								<img src={Logo} className="App-logo" alt="logo" />
							</div>
							<nav className='nav d-flex items-center'>
								<ul className='nav__list d-flex items-center'>
									<li className='nav__item'>
										<Link className="btn btn_text" to="/map">Карта</Link>
									</li>
									<li className='nav__item'>
										<Link className="btn btn_text" to="/profile">Профиль</Link>
									</li>
									<li className='nav__item'>
										<Link className="btn btn_text" to="/">Выйти</Link>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</header>
			</>
		)
	}

	componentDidUpdate() {
		if (this.props.isLoggedIn === false) {
			console.log(this.props)
		}
	}
}

export default withRouter(connect(
	state => ({ isLoggedIn: state.auth.isLoggedIn }),
	{ logOut }
)(Header));