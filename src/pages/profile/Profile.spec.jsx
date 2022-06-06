import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { shallow } from 'enzyme';
import Profile from './Profile';
import Header from '../../components/header/Header';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

describe('Profile', () => {

	const props = {
		isLoggedIn: true,
		saveProfileCardData: (cardHolderName, cardNumber, cardDate, cardCVC) => ({
			type: SAVE_PROFILE_CARD_DATA,
			payload: { cardHolderName, cardNumber, cardDate, cardCVC }
		})
	}
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

	const setUp = (props) => render(
		<MemoryRouter>
			<Provider store={mockStore}>
				<Profile {...props} />
			</Provider>
		</MemoryRouter>)

	describe('rendering Profile component', () => {
		it('renders Profile component without crashing', () => {
			const div = document.createElement('div');
			expect(div).not.toBeNull();
		});
		it('should render Profile component with props', () => {
			const component = setUp(props);
			expect(screen.getByTestId('profile-page')).toBeInTheDocument()
		});
	})

	describe('should render Profile component', () => {

		beforeEach(() => {
			render(
				<MemoryRouter>
					<Provider store={mockStore}>
						<Profile />
					</Provider>
				</MemoryRouter>
			)
		});

		it('should contain <Header />', () => {
			expect(screen.queryByTestId('header')).toBeInTheDocument()
		})

		it('should contain one <form>', () => {
			expect(screen.getByRole('form')).toBeInTheDocument();
		})

		it('should contain four <label>', () => {

			expect(screen.queryByLabelText(/Имя владельца/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/Номер карты/i)).toBeInTheDocument();
			expect(screen.getByLabelText('MM/YY')).toBeInTheDocument();
			expect(screen.getByLabelText(/CVC/i)).toBeInTheDocument();
		});
	})

	describe('input events', () => {
		let handleSubmit,
			handleChange

		const state = {
			cardHolderName: ``,
			cardNumber: ``,
			cardDate: ``,
			cardCVC: ``
		};

		const { cardHolderName, cardNumber, cardDate, cardCVC } = state;

		beforeEach(() => {
			handleChange = jest.fn();
			handleSubmit = jest.fn();
		});

		it('#handleChange', () => {
			const { getByLabelText } = render(
				<div className="form" id="card-data-form">
					<div className="form__title">Профиль</div>
					<p className="t-center">Введите платежные данные</p>
					<form name='CardDataForm' onSubmit={handleSubmit}>
						<div className='form__inner'>
							<div className="form__rows">
								<div className="form__item">
									<label>
										<span>Имя владельца</span>
										<input type="text" name="cardHolderName" placeholder="Loft" value={cardHolderName} onChange={handleChange} />
									</label>
								</div>
								<div className="form__item">
									<label>
										<span>Номер карты</span>
										<input type="text" name="cardNumber" placeholder="5545  2300  3432  4521" value={cardNumber} onChange={handleChange} />
									</label>
								</div>
								<div className="form__item">
									<label>
										<span>MM/YY</span>
										<input type="text" name="cardDate" placeholder="05/08" value={cardDate} onChange={handleChange} />
									</label>
								</div>
								<div className="form__item">
									<label>
										<span>CVC</span>
										<input type="password" name="cardCVC" placeholder="667" value={cardCVC} onChange={handleChange} />
									</label>
								</div>
							</div>
							<div className="card-image"></div>
						</div>
						<div className="form__item form__item_submit">
							<input type="submit" className="btn btn_bg theme-color" placeholder="Сохранить" defaultValue="Сохранить" />
						</div>
					</form>
				</div>
			)

			const cardHolderNameInput = getByLabelText('Имя владельца');
			const cardNumberInput = getByLabelText('Номер карты');
			const cardDateInput = getByLabelText('MM/YY');
			const cardCVCInput = getByLabelText('CVC');

			fireEvent.change(cardHolderNameInput, { target: { value: '' } })
			fireEvent.change(cardNumberInput, { target: { value: '' } })
			fireEvent.change(cardDateInput, { target: { value: '' } })
			fireEvent.change(cardCVCInput, { target: { value: '' } })

			act(() => {
				handleChange()
			})

			expect(cardHolderName).toBe(cardHolderNameInput.value);
			expect(cardNumber).toBe(cardNumberInput.value);
			expect(cardDate).toBe(cardDateInput.value);
			expect(cardCVC).toBe(cardCVCInput.value);
			expect(handleChange).toHaveBeenCalled();
		})

		it('#handleSubmit', () => {
			const { getByRole } = render(
				<div className="form" id="card-data-form">
					<div className="form__title">Профиль</div>
					<p className="t-center">Введите платежные данные</p>
					<form name='CardDataForm' onSubmit={handleSubmit}>
						<div className='form__inner'>
							<div className="form__rows">
								<div className="form__item">
									<label>
										<span>Имя владельца</span>
										<input type="text" name="cardHolderName" placeholder="Loft" value={cardHolderName} onChange={handleChange} />
									</label>
								</div>
								<div className="form__item">
									<label>
										<span>Номер карты</span>
										<input type="text" name="cardNumber" placeholder="5545  2300  3432  4521" value={cardNumber} onChange={handleChange} />
									</label>
								</div>
								<div className="form__item">
									<label>
										<span>MM/YY</span>
										<input type="text" name="cardDate" placeholder="05/08" value={cardDate} onChange={handleChange} />
									</label>
								</div>
								<div className="form__item">
									<label>
										<span>CVC</span>
										<input type="password" name="cardCVC" placeholder="667" value={cardCVC} onChange={handleChange} />
									</label>
								</div>
							</div>
							<div className="card-image"></div>
						</div>
						<div className="form__item form__item_submit">
							<input type="submit" className="btn btn_bg theme-color" placeholder="Сохранить" defaultValue="Сохранить" />
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


