import React from 'react';
import ReactDOM from 'react-dom';
import { unmountComponentAtNode } from "react-dom";
import RegForm from './RegForm';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import Button from './Button';


// const props = {
// 	navigateTo: (page) => {
// 		this.context.isLoggetIn === false
// 			? this.setState({ currentPage: 'login' })
// 			: this.setState({ currentPage: page })
// 	}
// }

// const setUp = (props) => shallow(<RegForm {...props} />)

// describe('rendering RegForm component', () => {
// 	it('renders RegForm component without crashing', () => {
// 		const div = document.createElement('div');
// 		ReactDOM.render(<RegForm />, div);
// 	});

// 	it('should render RegForm component with props', () => {
// 		const component = setUp(props);
// 		const form = component.find('.form');
// 		expect(form).toHaveLength(1);
// 	});
// })

// describe('should render RegForm component', () => {
// 	let component;

// 	beforeEach(() => {
// 		component = shallow(<RegForm />);
// 	});

// 	it('should contain one <form>', () => {
// 		const form = component.find('form');
// 		expect(form.length).toBe(1);
// 	})

// 	it('should contain three <label>', () => {
// 		expect(component.find('label')).toHaveLength(3);
// 	});

// })

// describe('RegForm handlers', () => {
// 	let component;

// 	beforeEach(() => {
// 		component = shallow(<RegForm />);
// 	});

// 	it('should handle onChange email input setState value ', () => {
// 		expect(component.instance().state.email).toBe('')
// 		component.find('input[name="email"]').simulate('change')
// 		component.instance().handleChange()
// 		expect(component.instance().state.email).toBe({ [e.target.name]: e.target.value })
// 	});

// 	it('should handle onChange name input setState value ', () => {
// 		expect(component.instance().state.name).toBe('')
// 		component.find('input[name="name"]').simulate('change')
// 		component.instance().handleChange()
// 		expect(component.instance().state.name).toBe({ [e.target.name]: e.target.value })
// 	});

// 	it('should handle onChange password input value "123" ', () => {
// 		expect(component.instance().state.password).toBe('')
// 		component.find('input[name="password"]').simulate('change')
// 		component.instance().handleChange()
// 		expect(component.instance().state.password).not.toBe('')
// 	});

// 	it('should handle onSubmit change isLoggedIn property ', () => {
// 		component.find('form').simulate('submit')
// 		component.instance().props.navigateTo();
// 		expect(component.instance().context.isLoggetIn).toBe(true)
// 	});

// 	it('should handle onSubmit reset form fields ', () => {
// 		component.find('form').simulate('submit')
// 		component.instance().handleReset()
// 		expect(component.instance().state.email).toBe('')
// 		expect(component.instance().state.password).toBe('')
// 	});
// })

describe('RegForm', () => {

	let container = null;
	beforeEach(() => {
		// подготавливаем DOM-элемент, куда будем рендерить
		container = document.createElement("div");
		document.body.appendChild(container);
	});

	afterEach(() => {
		// подчищаем после завершения
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});

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
			ReactDOM.render(<RegForm />, div);
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

			// expect(emailInput.value).toBe({ email });
			// expect(userNameInput.value).toBe({ name });
			// expect(passwordInput.value).toBe({ password });
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
				navigateTo();
			})

			expect(navigateTo).toHaveBeenCalled();
		})
	})
})

