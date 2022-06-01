import React from 'react';
import Button from '../button/Button';
import Logo from './../../logo.svg';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../actions';

class Header extends React.Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool,
		logOut: PropTypes.func
	}

	render() {
		let className = 'btn btn_text';
		// console.log(this.props.history)
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
										<Button className={className} callBack={this.props.logOut} name="Выйти" />
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</header>
			</>
		)
	}
}

export default connect(
	state => ({ isLoggedIn: state.auth.isLoggedIn }),
	{ logOut }
)(Header);