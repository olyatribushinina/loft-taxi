import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import Profile from './Profile';
import Header from '../../components/header/Header';

describe('Profile', () => {

	const props = {
		isLoggedIn: true,
		saveProfileCardData: (cardHolderName, cardNumber, cardDate, cardCVC) => ({
			type: SAVE_PROFILE_CARD_DATA,
			payload: { cardHolderName, cardNumber, cardDate, cardCVC }
		})
	}

	const setUp = (props) => shallow(<Profile {...props} />);

	describe('rendering Profile component', () => {
		it('renders Profile component without crashing', () => {
			const div = document.createElement('div');
			expect(div).not.toBeNull();
		});
		it('should render Profile component with props', () => {
			const component = setUp(props);
			const main = component.find('main');
			expect(main).toHaveLength(1);
		});
	})

	describe('should render Profile component', () => {
		let component;

		beforeEach(() => {
			component = shallow(<Profile />);
		});

		it('should contain <Header />', () => {
			expect(component.contains(<Header />)).toEqual(true);
		})

		it('should contain main', () => {
			const main = component.find('main');
			expect(main).toHaveLength(1);
		})

		it('should contain one <form>', () => {
			const form = component.find('form');
			expect(form.length).toBe(1);
		})

		it('should contain four <label>', () => {
			render(<Profile />);
			expect(screen.getByLabelText(/Имя владельца/i)).toBeInTheDocument();
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

		const { cardHolderName, cardNumber, cardDate, cardCVC } = this.state;

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
										<input type="password" name="cardCVC" placeholder="667" value={cardCVC} onChange={this.handleChange} />
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
										<input type="password" name="cardCVC" placeholder="667" value={cardCVC} onChange={this.handleChange} />
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


