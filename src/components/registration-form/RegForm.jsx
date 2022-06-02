import React from 'react';
import Button from '../button/Button';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { registration } from './../../actions';
import { Link } from 'react-router-dom';

class RegForm extends React.Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool,
		registration: PropTypes.func
	}

	state = {
		email: ``,
		password: ``,
		name: ``,
		surname: ``
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password, name, surname } = this.state;
		this.props.registration(email, password, name, surname);

	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { email, name, surname, password } = this.state;

		return (
			<div data-testid="registration-form-component">
				<div className="form">
					<div className="form__title">Регистрация</div>
					<form name='RegForm' onSubmit={this.handleSubmit} data-testid="registration-form">
						<div className="form__item">
							<label>
								<span>Email*</span>
								<input type="email" name="email" placeholder="mail@mail.ru" value={email} onChange={this.handleChange} />
							</label>
						</div>
						<div className="form__item">
							<label>
								<span>Имя*</span>
								<input type="text" name="name" placeholder="Гомер" value={name} onChange={this.handleChange} />
							</label>
						</div>
						<div className="form__item">
							<label>
								<span>Фамилия*</span>
								<input type="text" name="surname" placeholder="Симпсон" value={surname} onChange={this.handleChange} />
							</label>
						</div>
						<div className="form__item">
							<label>
								<span>Придумайте пароль*</span>
								<input type="password" name="password" placeholder="********" value={password} onChange={this.handleChange} />
							</label>
						</div>
						<div className="form__item form__item_submit">
							<input type="submit" className="btn btn_bg theme-color" placeholder="Зарегистрироваться" defaultValue="Зарегистрироваться" />
						</div>
						<div className="d-flex justify-center items-center">
							<span>Уже зарегистрированы?</span>
							<Link to="/">Войти</Link>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default connect(
	(state) => ({ isLoggedIn: state.auth.isLoggedIn }),
	{ registration }
)(RegForm);