import React from 'react'
import Header from '../../components/header/Header';
import Background from '../../images/map-over.png';
import CardLogo from '../../images/card/card-logo.svg';
import CardChip from '../../images/card/card-chip.svg';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { saveUserCardData } from './../../actions/actions';
import { compose } from 'redux';
import { Typography, withStyles } from '@material-ui/core';
import {
	Grid,
	Paper,
	Button,
	Box,
	FormControl,
	InputLabel,
	Input,
	TextField,
	CardMedia
} from '@mui/material';

import moduleFormStyles from '../../components/Form.module.css';
import moduleProfileStyles from './Profile.module.css';


const styles = theme => ({
	filled: {
		background: `center / cover no-repeat url(${Background})`,
		['@media (min-width: 900px)']: {
			minHeight: '100vh',
		}
	},
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
		const { filled, fullHeight } = this.props.classes;
		return (
			<div data-testid="profile-page">
				<Header setStorageAuth={this.props.setStorageAuth} />
				<main className={filled} >
					<section>
						<div className='container'>
							<Grid container
								direction="column"
								justifyContent="center"
								alignItems="center"
								sx={{ minHeight: 'inherit' }}>
								<Paper elevation={1} className={moduleProfileStyles.paper}>
									<h1 className={moduleProfileStyles.title}>Профиль</h1>
									<p className={moduleProfileStyles.subTitle}>Введите платежные данные</p>
									<form name='CardDataForm' onSubmit={this.handleSubmit}>
										<Grid container spacing={4} sx={{ padding: '40px 0' }}>
											<Grid item xs={6}>
												<FormControl fullWidth margin="normal">
													<InputLabel htmlFor="cardName">Имя владельца</InputLabel>
													<Input
														id="cardName"
														type="text"
														name="cardName"
														placeholder="Loft"
														value={cardName}
														onChange={this.handleChange} />
												</FormControl>
												<FormControl fullWidth margin="normal">
													<InputLabel htmlFor="cardNumber">Номер карты</InputLabel>
													<Input
														id="cardNumber"
														type="text"
														name="cardNumber"
														placeholder="5545  2300  3432  4521"
														value={cardNumber}
														onChange={this.handleChange} />
												</FormControl>
												<FormControl fullWidth margin="normal">
													<InputLabel htmlFor="expiryDate">MM/YY</InputLabel>
													<Input
														id="expiryDate"
														type="text"
														name="expiryDate"
														placeholder="05/08"
														value={expiryDate}
														onChange={this.handleChange} />
												</FormControl>
												<FormControl fullWidth margin="normal">
													<InputLabel htmlFor="expiryDate">CVC</InputLabel>
													<Input
														id="cvc"
														type="password"
														name="cvc"
														placeholder="667"
														value={cvc}
														onChange={this.handleChange} />
												</FormControl>
											</Grid>
											<Grid item xs={6}>
												<Paper elevation={5} className={moduleProfileStyles.card}>
													<Box className={moduleProfileStyles.cardHeader}>
														<CardMedia
															style={{
																backgroundImage: `url(${CardLogo})`,
																height: "33px",
																width: '33px'
															}}>
														</CardMedia>
														<Typography variant="body1">01/09</Typography>
													</Box>
													<Typography variant="body1">7659657656756</Typography>
													<Box className={moduleProfileStyles.cardFooter}>
														<CardMedia
															style={{
																backgroundImage: `url(${CardChip})`,
																height: "27px",
																width: '27px'
															}}>
														</CardMedia>
														<Box className={moduleProfileStyles.paySystemLogo}></Box>
													</Box>
												</Paper>
											</Grid>
										</Grid>
										<Box className={moduleProfileStyles.box}>
											<Button variant="contained" type="submit" sx={{ minWidth: '353px' }}>Сохранить</Button>
										</Box>
									</form>
								</Paper>
							</Grid>
						</div>
					</section>
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