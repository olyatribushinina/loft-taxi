import React from 'react';
import Button from './Button';

class LoginForm extends React.Component {
	state = {
		email: ``,
		name: ``,
		password: ``
	};

	handlSubmit = e => {
		e.preventDefault();
		console.log(this.state.email);
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		const { navigateTo } = this.props;

		return (
			<>
				<div class="form">
					<div class="form__title">Войти</div>
					<form onSubmit={() => navigateTo("map")}>
						<div class="form__item">
							<label>
								<span>Email</span>
								<input type="email" name="email" placeholder="mail@mail.ru" value="" onChange={this.handleChange} />
							</label>
						</div>
						<div class="form__item">
							<label>
								<span>Пароль</span>
								<input type="password" name="password" autocomplete="on" placeholder="********" value="" onChange={this.handleChange} />
							</label>
							<Button className="btn btn_text self-end" callBack={() => navigateTo("reg")} name="Забыли пароль" />
						</div>
						<div class="form__item form__item_submit">
							<input type="submit" class="btn btn_bg theme-color" value="Войти" />
						</div>
						<div class="d-flex justify-center items-center">
							<span>Новый пользователь?</span>
							<Button className="btn btn_text theme-color" callBack={() => navigateTo("reg")} name="Регистрация" />
						</div>
					</form>
				</div>
			</>

		)
	}
}

class RegForm extends React.Component {
	render() {
		const { navigateTo } = this.props;

		return (
			<>
				<div class="form">
					<div class="form__title">Регистрация</div>
					<form onSubmit={() => navigateTo("map")}>
						<div class="form__item">
							<label>
								<span>Email*</span>
								<input type="email" name="email" placeholder="mail@mail.ru" required="" value="" onChange={this.handleChange} />
							</label>
						</div>
						<div class="form__item">
							<label>
								<span>Как вас зовут*</span>
								<input type="text" name="name" placeholder="Гомер Симпсон" required="" value="" onChange={this.handleChange} />
							</label>
						</div>
						<div class="form__item">
							<label>
								<span>Придумайте пароль*</span>
								<input type="password" name="password" autocomplete="on" placeholder="********" value="" onChange={this.handleChange} />
							</label>
						</div>
						<div class="form__item form__item_submit">
							<input type="submit" class="btn btn_bg theme-color" value="Зарегистрироваться" />
						</div>
						<div class="d-flex justify-center items-center">
							<span>Уже зарегистрированы?</span>
							<Button className="btn btn_text theme-color" callBack={() => navigateTo("login")} name="Войти" />
						</div>
					</form>
				</div>
			</>
		)
	}
}

export { LoginForm, RegForm };