import React, { useState } from 'react'
import Header from '../../components/header/Header';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

function Profile(props) {
	const [cardHolderName, setCardHolderName] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [cardDate, setCardDate] = useState('');
	const [cardCVC, setCardCVC] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(cardHolderName)
	}

	return (
		<>
			<Header />
			<main className='maincontent'>
				<div className='container'>
					<h1>Профиль</h1>
					<div className="form" id="pay-data-form">
						<div className="form__title">Профиль</div>
						<p className="t-center">Введите платежные данные</p>
						<form name='PayDataForm' onSubmit={handleSubmit}>
							<div className='form__inner'>
								<div className="form__rows">
									<div className="form__item">
										<label>
											<span>Имя владельца</span>
											<input type="text" name="cardHolderName" placeholder="Loft" value={cardHolderName} onChange={e => setCardHolderName(e.target.value)} />
										</label>
									</div>
									<div className="form__item">
										<label>
											<span>Номер карты</span>
											<input type="text" name="cardNumber" placeholder="5545  2300  3432  4521" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
										</label>
									</div>
									<div className="form__item">
										<label>
											<span>MM/YY</span>
											<input type="text" name="cardDate" placeholder="05/08" value={cardDate} onChange={e => setCardDate(e.target.value)} />
										</label>
									</div>
									<div className="form__item">
										<label>
											<span>CVC</span>
											<input type="password" name="cardCVC" placeholder="667" value={cardCVC} onChange={e => setCardCVC(e.target.value)} />
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

Profile.propTypes = {
	isLoggedIn: PropTypes.bool
}

export default connect(
	(state) => ({ isLoggedIn: state.auth.isLoggedIn })
)(Profile);