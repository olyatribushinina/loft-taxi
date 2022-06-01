import React from 'react';
import Button from '../button/Button';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { authenticate } from './../../actions';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool,
		authenticate: PropTypes.func
	}

	state = {
		email: ``,
		password: ``
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		this.props.authenticate(email, password);
		this.handleReset();
	};

	handleReset = e => {
		this.setState({ email: '', password: '' })
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { email, password } = this.state;
		// console.log(this.props)
		return (
			<>
				<div className="form">
					<div className="form__title">Войти</div>
					<form name='LoginForm' onSubmit={this.handleSubmit}>
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
							<Button className="btn btn_text self-end" name="Забыли пароль" />
						</div>
						<div className="form__item form__item_submit">
							<input type="submit" className="btn btn_bg theme-color" placeholder="Войти" defaultValue="Войти" />
						</div>
						<div className="d-flex justify-center items-center">
							<span>Новый пользователь?</span>
							<Link className="btn btn_text self-end" to="/registration">Регистрация</Link>
						</div>
					</form>
				</div>
			</>

		)
	}
}

export default connect(
	(state) => ({ isLoggedIn: state.auth.isLoggedIn }),
	{ authenticate }
)(LoginForm);
