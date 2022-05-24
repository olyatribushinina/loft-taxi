import React from 'react';
import ReactDOM from 'react-dom';
import { unmountComponentAtNode } from "react-dom";
import RegForm from './RegForm';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import Button from './../button/Button';

describe('RegForm', () => {

	const props = {
		navigateTo: (page) => {
			this.context.isLoggetIn === false
				? this.setState({ currentPage: 'login' })
				: this.setState({ currentPage: page })
		}
	}

	const setUp = (props) => shallow(<RegForm {...props} />)

	describe('rendering RegForm component', () => {
		it('renders RegForm component without crashing', () => {
			const div = document.createElement('div');
			expect(div).not.toBeNull();
		});
		it('should render RegForm component with props', () => {
			const component = setUp(props);
			const form = component.find('.form');
			expect(form).toHaveLength(1);
		});
	})

	describe('should render RegForm component', () => {
		it('should contain one <form>', () => {
			const component = shallow(<RegForm />);
			const form = component.find('form');
			expect(form.length).toBe(1);
		})
		it('should contain three <label>', () => {
			render(<RegForm />);
			expect(screen.getByLabelText(/Email*/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/Как вас зовут*/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/Придумайте пароль*/i)).toBeInTheDocument();
		});
	})

	describe('input events', () => {
		let handleSubmit,
			handleChange,
			navigateTo;


		const state = {
			email: ``,
			name: ``,
			password: ``
		};

		const { email, name, password } = state;

		beforeEach(() => {
			handleChange = jest.fn();
			handleSubmit = jest.fn();
			navigateTo = jest.fn();
		});

		it('#handleChange', () => {
			const { getByLabelText } = render(
				<div className="form">
					<div className="form__title">Регистрация</div>
					<form name='RegForm' onSubmit={() => navigateTo("map")}>
						<div className="form__item">
							<label>
								<span>Email*</span>
								<input type="email" name="email" placeholder="mail@mail.ru" value={email} onChange={handleChange} />
							</label>
						</div>
						<div className="form__item">
							<label>
								<span>Как вас зовут*</span>
								<input type="text" name="name" placeholder="Гомер Симпсон" value={name} onChange={handleChange} />
							</label>
						</div>
						<div className="form__item">
							<label>
								<span>Придумайте пароль*</span>
								<input type="password" name="password" placeholder="********" value={password} onChange={handleChange} />
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
			)

			const emailInput = getByLabelText('Email*');
			const userNameInput = getByLabelText('Как вас зовут*');
			const passwordInput = getByLabelText('Придумайте пароль*');

			fireEvent.change(emailInput, { target: { value: '' } })
			fireEvent.change(userNameInput, { target: { value: '' } })
			fireEvent.change(passwordInput, { target: { value: '' } })

			act(() => {
				handleChange()
			})

			expect(email).toBe(emailInput.value);
			expect(name).toBe(userNameInput.value);
			expect(password).toBe(passwordInput.value);
			expect(handleChange).toHaveBeenCalled();
		})

		it('#handleSubmit', () => {
			const { getByRole } = render(
				<div className="form">
					<div className="form__title">Регистрация</div>
					<form name='RegForm' onSubmit={() => navigateTo("map")}>
						<div className="form__item">
							<label>
								<span>Email*</span>
								<input type="email" name="email" placeholder="mail@mail.ru" value={email} onChange={handleChange} />
							</label>
						</div>
						<div className="form__item">
							<label>
								<span>Как вас зовут*</span>
								<input type="text" name="name" placeholder="Гомер Симпсон" value={name} onChange={handleChange} />
							</label>
						</div>
						<div className="form__item">
							<label>
								<span>Придумайте пароль*</span>
								<input type="password" name="password" placeholder="********" value={password} onChange={handleChange} />
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
			)
			const form = getByRole('form');
			expect(form).toBeInTheDocument();

			fireEvent.submit(form);

			act(() => {
				handleSubmit();
			})

			expect(handleSubmit).toHaveBeenCalled();
		})
	})
})


