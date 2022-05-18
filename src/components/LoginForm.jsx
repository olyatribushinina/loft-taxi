import React from 'react';
import Button from './Button';

class LoginForm extends React.Component {
	state = {
		email: ``,
		password: ``
	};

	handleSubmit = e => {
		e.preventDefault();
	};

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
					<form onSubmit={() => navigateTo("map")}>
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
}

export default LoginForm;
