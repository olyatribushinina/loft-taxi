import React from 'react'
import Header from '../../components/header/Header';
import Logo from './../../images/logo-main.svg';
import Background from '../../images/map-over.png'
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { saveUserCardData } from './../../actions/actions';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
	filled: {
		background: `center / cover no-repeat url(${Background})`
	}
})

class Profile extends React.Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool,
		saveUserCardData: PropTypes.func
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
		// console.log(this.props.setStorageAuth)
		let token = this.props.storage.token;

		this.props.saveUserCardData(cardNumber, expiryDate, cardName, cvc, token);
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { cardNumber, expiryDate, cardName, cvc } = this.state;
		const { filled } = this.props.classes;
		return (
			<div data-testid="profile-page">
				<Header setStorageAuth={this.props.setStorageAuth} />
				<main className={filled} >
					<div className='container'>
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
			</div>
		)
	}

}

export default compose(
	connect(
		state => ({ isLoggedIn: state.auth.isLoggedIn }),
		{ saveUserCardData }
	),
	withStyles(styles),
)(Profile);