import React from 'react';
import Button from './Button';
import logo from './../logo.svg';

class Header extends React.Component {
	render() {
		const { navigateTo } = this.props;
		let className = 'btn btn_text';

		return (
			<header className="header">
				<div className="container">
					<div className="d-flex items-center">
						<div className="logo">
							<img src={logo} className="App-logo" alt="logo" />
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
									<Button className={className} callBack={() => navigateTo("login")} name="Выйти" />
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>
		)
	}
}

export default Header;