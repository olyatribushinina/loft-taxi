import React from 'react';
import Button from './Button';
import PropTypes from "prop-types";

class RegForm extends React.Component {
	static propTypes = {
		navigateTo: PropTypes.func
	}

	state = {
		email: ``,
		name: ``,
		password: ``
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { navigateTo } = this.props;
		const { email, name, password } = this.state;

		return (
			<>
				<div className="form">
					<div className="form__title">Регистрация</div>
					<form onSubmit={() => navigateTo("map")}>
						<div className="form__item">
							<label>
								<span>Email*</span>
								<input type="email" name="email" placeholder="mail@mail.ru" value={email} onChange={this.handleChange} />
							</label>
						</div>
						<div className="form__item">
							<label>
								<span>Как вас зовут*</span>
								<input type="text" name="name" placeholder="Гомер Симпсон" value={name} onChange={this.handleChange} />
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
							<Button className="btn btn_text theme-color" callBack={() => navigateTo("login")} name="Войти" />
						</div>
					</form>
				</div>
			</>
		)
	}
}

export default RegForm;