import React from 'react';
import Button from './Button';
import Logo from './../logo.svg';
import PropTypes from "prop-types";
import { AuthContext } from './AuthContext';

class Header extends React.Component {
	static propTypes = {
		navigateTo: PropTypes.func
	}

	static contextType = AuthContext;

	render() {
		const { navigateTo } = this.props;
		let className = 'btn btn_text';

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
										<Button className={className} callBack={() => navigateTo("map")} name="Карта" />
									</li>
									<li className='nav__item'>
										<Button className={className} callBack={() => navigateTo("profile")} name="Профиль" />
									</li>
									<li className='nav__item'>
										<Button className={className} callBack={this.context.logOut} name="Выйти" />
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
		if (!this.context.isLoggedIn) {
			this.props.navigateTo('login')
		}
	}
}

export default Header;