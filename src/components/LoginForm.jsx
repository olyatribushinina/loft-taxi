import React from 'react';
import Button from './Button';
import PropTypes from "prop-types";
import { AuthContext } from './AuthContext';

class LoginForm extends React.Component {
	static propTypes = {
		navigateTo: PropTypes.func
	}

	static contextType = AuthContext;

	state = {
		email: ``,
		password: ``
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		this.context.logIn(email, password);
		this.handleReset();
	};

	handleReset = e => {
		this.setState({ email: '', password: '' })
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { navigateTo } = this.props;
		const { email, password } = this.state;

		return (
			<>
				<div className="form">
					<div className="form__title">Войти</div>
					<form ref={(el) => this.LoginFormRef = el} onSubmit={this.handleSubmit}>
						<div className="form__item">
							<label>
								<span>Email</span>
								<input type="email" name="email" placeholder="mail@mail.ru" value={email} onChange={this.handleChange} />
							</label>
						</div>
						<div className="form__item">
							<label>
								<span>Пароль</span>
								<input type="password" name="password" placeholder="********" value={password} onChange={this.handleChange} />
							</label>
							<Button className="btn btn_text self-end" callBack={() => navigateTo("reg")} name="Забыли пароль" />
						</div>
						<div className="form__item form__item_submit">
							<input type="submit" className="btn btn_bg theme-color" placeholder="Войти" defaultValue="Войти" />
						</div>
						<div className="d-flex justify-center items-center">
							<span>Новый пользователь?</span>
							<Button className="btn btn_text theme-color" callBack={() => navigateTo("reg")} name="Регистрация" />
						</div>
					</form>
				</div>

			</>

		)
	}

	componentDidUpdate() {
		if (this.context.isLoggedIn) {
			this.props.navigateTo('map')
		}
	}
}

export default LoginForm;
