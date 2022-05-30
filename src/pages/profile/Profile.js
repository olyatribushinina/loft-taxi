import React from 'react'
import Header from '../../components/header/Header';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { saveProfileCardData } from './../../actions'

class Profile extends React.Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool,
		token: PropTypes.string,
		saveProfileCardData: PropTypes.func
	}

	state = {
		cardNumber: ``,
		expiryDate: ``,
		cardName: ``,
		cvc: ``
	};

	handleSubmit = e => {
		e.preventDefault();
		const { cardNumber, expiryDate, cardName, cvc } = this.state;
		this.props.saveProfileCardData(cardNumber, expiryDate, cardName, cvc, this.props.token);
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { cardNumber, expiryDate, cardName, cvc } = this.state;
		return (
			<>
				<Header />
				<main className='maincontent'>
					<div className='container'>
						<h1>Профиль</h1>
						<div className="form" id="card-data-form">
							<div className="form__title">Профиль</div>
							<p className="t-center">Введите платежные данные</p>
							<form name='CardDataForm' onSubmit={this.handleSubmit}>
								<div className='form__inner'>
									<div className="form__rows">
										<div className="form__item">
											<label>
												<span>Имя владельца</span>
												<input type="text" name="cardName" placeholder="Loft" value={cardName} onChange={this.handleChange} />
											</label>
										</div>
										<div className="form__item">
											<label>
												<span>Номер карты</span>
												<input type="text" name="cardNumber" placeholder="5545  2300  3432  4521" value={cardNumber} onChange={this.handleChange} />
											</label>
										</div>
										<div className="form__item">
											<label>
												<span>MM/YY</span>
												<input type="text" name="expiryDate" placeholder="05/08" value={expiryDate} onChange={this.handleChange} />
											</label>
										</div>
										<div className="form__item">
											<label>
												<span>CVC</span>
												<input type="password" name="cvc" placeholder="667" value={cvc} onChange={this.handleChange} />
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
					</div>
				</main>
			</>
		)
	}

}

export default connect(
	(state) => ({ isLoggedIn: state.auth.isLoggedIn, token: state.auth.token }),
	{ saveProfileCardData }
)(Profile);