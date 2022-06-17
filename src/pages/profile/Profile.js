import React from 'react';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';
import Background from '../../images/map-over.png';
import CardLogo from '../../images/card/card-logo.svg';
import CardChip from '../../images/card/card-chip.svg';
import PropTypes from "prop-types";
import { connect, useDispatch } from 'react-redux';
import { saveUserCardData } from './../../actions/actions';
import { compose } from 'redux';
import { Typography, withStyles } from '@material-ui/core';
import { Grid, Paper, Button, Box, CardMedia, TextField } from '@mui/material';
import moduleProfileStyles from './Profile.module.css';
import { useForm, Controller } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import NumberFormat from "react-number-format";

const styles = theme => ({
	filled: {
		minHeight: '100vh',
		background: `center / cover no-repeat url(${Background})`,
	},
})
const Profile = (props) => {
	const { token, userCardData, saveUserCardData } = props;

	const { filled } = props.classes;

	const {
		handleSubmit,
		control,
		formState: {
			errors, isValid, isSubmitted
		}
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			cardName: userCardData.cardName,
			cardNumber: userCardData.cardNumber,
			expiryDate: userCardData.expiryDate,
			cvc: userCardData.cvc,
		}
	});

	const dispatch = useDispatch();

	const onSubmit = (data) => {
		const { cardNumber, expiryDate, cardName, cvc } = data;
		dispatch(saveUserCardData(cardNumber, expiryDate, cardName, cvc, token))
	};

	return (
		<div data-testid="profile-page">
			<Header />
			<main className={filled} >
				<section >
					<div className='container'>
						<Grid container
							direction="column"
							justifyContent="center"
							alignItems="center"
							sx={{ minHeight: 'inherit' }}>
							{!isSubmitted
								?
								(<Paper elevation={1} className={moduleProfileStyles.paper}>
									<h1 className={moduleProfileStyles.title}>Профиль</h1>
									<p className={moduleProfileStyles.subTitle}>
										Введите платежные данные
									</p>
									<form name='CardDataForm' onSubmit={handleSubmit(onSubmit)}>
										<Grid
											container
											spacing={4}
											sx={{
												padding: '40px 0',
												flexDirection: {
													md: 'row',
													xs: 'column'
												},
											}}
										>
											<Grid
												item xs={6}
												sx={{
													maxWidth: {
														xs: '100%',
														md: '50%'
													}
												}}
											>
												<Controller
													control={control}
													name="cardName"
													rules={{
														required: {
															value: true,
															message: "Введите имя"
														},
													}}
													render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
														<TextField
															{...field}
															inputRef={ref}
															variant="standard"
															margin="normal"
															fullWidth
															id="cardName"
															type="text"
															name="cardName"
															placeholder="Loft"
															aria-describedby="cardName-helper-text"
															label="Имя владельца"
															error={invalid}
															helperText={errors.cardName && <span>{errors.cardName.message}</span>}
														/>
													)}
												/>

												<Controller
													control={control}
													name="cardNumber"
													rules={{
														required: {
															value: true,
															message: "введите номер карты"
														},
													}}
													render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
														<NumberFormat
															format="#### #### #### ####"
															{...field}
															inputRef={ref}
															customInput={TextField}
															variant="standard"
															margin="normal"
															fullWidth
															id="cardNumber"
															type="text"
															placeholder="5545 2300 3432 4521"
															aria-describedby="cardNumber-helper-text"
															label="Номер карты"
															error={invalid}
															helperText={errors.cardNumber && <span>{errors.cardNumber.message}</span>}
														/>
													)}
												/>


												<Controller
													control={control}
													name="expiryDate"
													rules={{
														required: true,
														message: "введите дату"
													}}
													defaultValue={userCardData.expiryDate}
													render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
														<NumberFormat
															format="##/##"
															{...field}
															inputRef={ref}
															customInput={TextField}
															variant="standard"
															margin="normal"
															fullWidth
															id="expiryDate"
															type="text"
															placeholder="05/08"
															aria-describedby="expiryDate-helper-text"
															label="MM/YY"
															error={invalid}
															helperText={errors.expiryDate && <span>{errors.expiryDate.message}</span>}

														/>
													)}
												/>


												<Controller
													control={control}
													name="cvc"
													rules={{
														required: true,
														message: "введите cvc"
													}}
													defaultValue={userCardData.cvc}
													render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
														<NumberFormat
															format="###"
															{...field}
															inputRef={ref}
															customInput={TextField}
															variant="standard"
															margin="normal"
															fullWidth
															id="cvc"
															type="text"
															placeholder="667"
															aria-describedby="cvc-helper-text"
															label="CVC"
															error={invalid}
															helperText={errors.cvc && <span>{errors.cvc.message}</span>}
														/>
													)}
												/>
											</Grid>
											<Grid
												item
												xs={6}
												sx={{
													order: {
														xs: ' -1',
														md: '1'
													},
													maxWidth: {
														xs: ' 100%',
														md: '50%'
													},

												}}
											>
												<Paper elevation={5} className={moduleProfileStyles.card}>
													<Box className={moduleProfileStyles.cardHeader}>
														<CardMedia
															image={CardLogo}
															alt="Card Logo Image"
															style={{
																height: "33px",
																width: '33px'
															}}
															component='img'
														/>
														<Typography variant="body1">{userCardData.expiryDate ? `${userCardData.expiryDate}` : '05/08'}</Typography>
													</Box>
													<Typography variant="body1">{userCardData.cardNumber ? `${userCardData.cardNumber}` : '5545 2300 3432 4521'}</Typography>
													<Box className={moduleProfileStyles.cardFooter}>
														<CardMedia
															image={CardChip}
															alt="Card Chip Image"
															style={{
																height: "27px",
																width: '27px'
															}}
															component='img'
														/>
														<Box className={moduleProfileStyles.paySystemLogo}></Box>
													</Box>
												</Paper>
											</Grid>
										</Grid>
										<Box className={moduleProfileStyles.box}>
											<Button disabled={!isValid} variant="contained" type="submit" sx={{ minWidth: '353px' }}>Сохранить</Button>
										</Box>
									</form>
								</Paper>)
								:
								(<Paper elevation={1} className={moduleProfileStyles.paper}>
									<h1 className={moduleProfileStyles.title}>Профиль</h1>
									<p className={moduleProfileStyles.subTitle}>
										Платёжные данные обновлены. Теперь вы можете заказывать такси.
									</p>
									<Box className={moduleProfileStyles.box}>
										<Button variant="contained" sx={{ minWidth: '353px' }}>
											<Link to="/map" style={{ color: '#000' }}>Перейти на карту</Link>
										</Button>
									</Box>
								</Paper>)
							}
						</Grid>
					</div>
				</section>
			</main>
		</div>
	)
}

Profile.propTypes = {
	isLoggedIn: PropTypes.bool,
	token: PropTypes.string,
	userCardData: PropTypes.object,
	saveUserCardData: PropTypes.func
}

export default compose(
	connect(
		state => ({
			isLoggedIn: state.auth.isLoggedIn,
			token: state.auth.token,
			userCardData: state.payment.userCardData,
		}),
		{ saveUserCardData }
	),
	withStyles(styles),
)(Profile);