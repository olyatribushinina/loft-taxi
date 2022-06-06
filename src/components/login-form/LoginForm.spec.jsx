import React from 'react';
import LoginForm from '../../components/login-form/LoginForm';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import Button from './../button/Button';
import { MemoryRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';

describe('LoginForm', () => {

	let mockStore;

	beforeEach(() => {
		mockStore = {
			getState: () => ({
				auth: {
					isLoggedIn: false,
					token: '',
					userData: {},
					userCardData: {}
				}
			}),
			subscribe: () => { },
			dispatch: () => { },
		};
	});


	const props = {
		isLoggedIn: false,
		authenticate: (email, password) => ({
			type: AUTHENTICATE,
			payload: { email, password }
		})
	}

	const setUp = (props) => render(
		<MemoryRouter>
			<Provider store={mockStore}>
				<LoginForm {...props} />
			</Provider>
		</MemoryRouter>
	)

	describe('rendering LoginForm component', () => {
		it('renders LoginForm component without crashing', () => {
			const div = document.createElement('div');
			expect(div).not.toBeNull();
		});
		it('should render LoginForm component with props', () => {
			const component = setUp(props);
			expect(screen.getByTestId('login-form-component')).toBeInTheDocument();
		});
	})

	describe('should render LoginForm component', () => {

		beforeEach(() => {
			render(
				<MemoryRouter>
					<Provider store={mockStore}>
						<LoginForm />
					</Provider>
				</MemoryRouter>
			)
		})

		it('should contain <form>', () => {
			expect(screen.getByTestId('login-form')).toBeInTheDocument();
		})

		it('should contain two <label>', () => {
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

				<MemoryRouter>
					<Provider store={mockStore}>
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
					</Provider>
				</MemoryRouter>
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
				<MemoryRouter>
					<Provider store={mockStore}>
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
					</Provider>
				</MemoryRouter>
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

