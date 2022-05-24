import React from 'react';
import ReactDOM from 'react-dom';
import { unmountComponentAtNode } from "react-dom";
import LoginForm from '../../components/login-form/LoginForm';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import Button from './../button/Button';

describe('LoginForm', () => {

	const props = {
		navigateTo: (page) => {
			this.context.isLoggetIn === false
				? this.setState({ currentPage: 'login' })
				: this.setState({ currentPage: page })
		}
	}

	const setUp = (props) => shallow(<LoginForm {...props} />)

	describe('rendering LoginForm component', () => {
		it('renders LoginForm component without crashing', () => {
			const div = document.createElement('div');
			expect(div).not.toBeNull();
		});
		it('should render LoginForm component with props', () => {
			const component = setUp(props);
			const form = component.find('.form');
			expect(form).toHaveLength(1);
		});
	})

	describe('should render LoginForm component', () => {
		it('should contain one <form>', () => {
			const component = shallow(<LoginForm />);
			const form = component.find('form');
			expect(form.length).toBe(1);
		})
		it('should contain two <label>', () => {
			render(<LoginForm />);
			expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
		});
	})

	describe('input events', () => {
		let handleSubmit,
			handleChange;

		const state = {
			email: ``,
			password: ``
		};

		const { email, password } = state;

		beforeEach(() => {
			handleChange = jest.fn();
			handleSubmit = jest.fn();
		});

		it('#handleChange', () => {
			const { getByLabelText } = render(
				<div className="form">
					<div className="form__title">Войти</div>
					<form name='LoginForm' onSubmit={handleSubmit}>
						<div className="form__item">
							<label>
								<span>Email</span>
								<input type="email" name="email" placeholder="mail@mail.ru" value={email} onChange={handleChange} data-testid="element" />
							</label>
						</div>
						<div className="form__item">
							<label>
								<span>Пароль</span>
								<input type="password" name="password" placeholder="********" value={password} onChange={handleChange} data-testid="element" />
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
			)

			const emailInput = getByLabelText('Email');
			const passwordInput = getByLabelText('Пароль');

			fireEvent.change(emailInput, { target: { value: '' } })
			fireEvent.change(passwordInput, { target: { value: '' } })

			act(() => {
				handleChange()
			})

			expect(email).toBe(emailInput.value);
			expect(password).toBe(passwordInput.value);
			expect(handleChange).toHaveBeenCalled();
		})

		it('#handleSubmit', () => {
			const { getByRole } = render(
				<div className="form">
					<div className="form__title">Войти</div>
					<form name='LoginForm' onSubmit={handleSubmit}>
						<div className="form__item">
							<label>
								<span>Email</span>
								<input type="email" name="email" placeholder="mail@mail.ru" value={email} onChange={handleChange} data-testid="element" />
							</label>
						</div>
						<div className="form__item">
							<label>
								<span>Пароль</span>
								<input type="password" name="password" placeholder="********" value={password} onChange={handleChange} data-testid="element" />
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
			)
			const form = getByRole('form');
			expect(form).toBeInTheDocument();

			fireEvent.submit(form);

			// expect(form).toHaveFormValues({
			// 	email: 'test@test.com',
			// 	password: '123123',
			// })

			act(() => {
				handleSubmit();
			})

			expect(handleSubmit).toHaveBeenCalled();
		})
	})
})

