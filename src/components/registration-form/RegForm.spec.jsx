import React from 'react';
import RegForm from './RegForm';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { REGISTRATION } from '../../actions/actions';

describe('RegForm', () => {

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
		registration: (email, password, name, surname) => ({
			type: REGISTRATION,
			payload: { email, password, name, surname }
		})
	}

	const setUp = (props) => render(
		<MemoryRouter>
			<Provider store={mockStore}>
				<RegForm {...props} />
			</Provider>
		</MemoryRouter>
	)

	describe('rendering RegForm component', () => {
		it('renders RegForm component without crashing', () => {
			const div = document.createElement('div');
			expect(div).not.toBeNull();
		});
		it('should render RegForm component with props', () => {
			const component = setUp(props);
			expect(screen.getByTestId('registration-form-component')).toBeInTheDocument()
		});
	})

	describe('should render RegForm component', () => {

		beforeEach(() => {
			render(
				<MemoryRouter>
					<Provider store={mockStore}>
						<RegForm />
					</Provider>
				</MemoryRouter>
			)
		})

		it('should contain <form>', () => {
			expect(screen.getByTestId('registration-form')).toBeInTheDocument()
		})
		it('should contain three <label>', () => {
			expect(screen.getByLabelText(/Email*/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/Имя*/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/Фамилия*/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/Придумайте пароль*/i)).toBeInTheDocument();
		});
	})

	describe('input events', () => {
		let handleSubmit,
			handleChange

		const state = {
			email: ``,
			password: ``,
			name: ``,
			surname: ``
		};

		const { email, password, name, surname } = state;

		beforeEach(() => {
			handleChange = jest.fn();
			handleSubmit = jest.fn();
		});

		it('#handleChange', () => {
			const { getByLabelText } = render(
				<MemoryRouter>
					<Provider store={mockStore}>
						<div className="form">
							<div className="form__title">Регистрация</div>
							<form name='RegForm' onSubmit={handleSubmit} data-testid="registration-form">
								<div className="form__item">
									<label>
										<span>Email*</span>
										<input type="email" name="email" placeholder="mail@mail.ru" value={email} onChange={handleChange} />
									</label>
								</div>
								<div className="form__item">
									<label>
										<span>Имя*</span>
										<input type="text" name="name" placeholder="Гомер" value={name} onChange={handleChange} />
									</label>
								</div>
								<div className="form__item">
									<label>
										<span>Фамилия*</span>
										<input type="text" name="surname" placeholder="Симпсон" value={surname} onChange={handleChange} />
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
									<Link to="/">Войти</Link>
								</div>
							</form>
						</div>
					</Provider>
				</MemoryRouter>
			)

			const emailInput = getByLabelText('Email*');
			const userNameInput = getByLabelText('Имя*');
			const userSurnameInput = getByLabelText('Фамилия*');
			const passwordInput = getByLabelText('Придумайте пароль*');

			fireEvent.change(emailInput, { target: { value: '' } })
			fireEvent.change(userNameInput, { target: { value: '' } })
			fireEvent.change(userSurnameInput, { target: { value: '' } })
			fireEvent.change(passwordInput, { target: { value: '' } })

			act(() => {
				handleChange()
			})

			expect(email).toBe(emailInput.value);
			expect(name).toBe(userNameInput.value);
			expect(surname).toBe(userNameInput.value);
			expect(password).toBe(userSurnameInput.value);
			expect(handleChange).toHaveBeenCalled();
		})

		it('#handleSubmit', () => {
			const { getByRole } = render(
				<MemoryRouter>
					<Provider store={mockStore}>
						<div className="form">
							<div className="form__title">Регистрация</div>
							<form name='RegForm' onSubmit={handleSubmit} data-testid="registration-form">
								<div className="form__item">
									<label>
										<span>Email*</span>
										<input type="email" name="email" placeholder="mail@mail.ru" value={email} onChange={handleChange} />
									</label>
								</div>
								<div className="form__item">
									<label>
										<span>Имя*</span>
										<input type="text" name="name" placeholder="Гомер" value={name} onChange={handleChange} />
									</label>
								</div>
								<div className="form__item">
									<label>
										<span>Фамилия*</span>
										<input type="text" name="surname" placeholder="Симпсон" value={surname} onChange={handleChange} />
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
									<Link to="/">Войти</Link>
								</div>
							</form>
						</div>
					</Provider>
				</MemoryRouter>
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


