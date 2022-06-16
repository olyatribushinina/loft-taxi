import React, { useEffect, useState, useRef, useCallback } from 'react'
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
import { Grid, Paper, Button, Box, FormControl, FormHelperText, InputLabel, Input, CardMedia, TextField } from '@mui/material';
import moduleProfileStyles from './Profile.module.css';
import { useForm, Controller, useWatch } from 'react-hook-form';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumberFormat from "react-number-format";

const styles = theme => ({
	filled: {
		background: `center / cover no-repeat url(${Background})`,
		['@media (min-width: 900px)']: {
			minHeight: '100vh',
		}
	},
})
const Profile = (props) => {
	const { token, userCardData, saveUserCardData } = props;

	const { filled } = props.classes;

	const {
		register,
		watch,
		handleSubmit,
		setValue,
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

	const [cardNumberVal, setCardNumberVal] = useState(`${userCardData.cardNumber}`);
	const [cardExpiryVal, setCardExpiryVal] = useState(`${userCardData.expiryDate}`);


	const onSubmit = (data) => {
		const { cardNumber, expiryDate, cardName, cvc } = data;
		dispatch(saveUserCardData(cardNumber, expiryDate, cardName, cvc, token))
	};

	return (
		<div data-testid="profile-page">
			<Header />
			<main className={filled} >
				<section>
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
										<Grid container spacing={4} sx={{ padding: '40px 0' }}>
											<Grid item xs={6}>
												<FormControl fullWidth margin="normal" variant="standard">
													<InputLabel htmlFor="cardName">Имя владельца</InputLabel>
													<Input
														{...register('cardName', {
															required: {
																value: true,
																message: "Введите имя"
															},
															pattern: {
																value: /^[a-zA-Z]+$/,
																message: "Значение должно состоять из букв"
															},
															minLength: {
																value: 2,
																message: "Имя слишком короткое"
															}
														})}
														id="cardName"
														type="text"
														name="cardName"
														placeholder="Loft"
														aria-describedby="cardName-helper-text"
													/>
													<FormHelperText
														id="cardName-helper-text">
														{errors.cardName && <span>{errors.cardName.message}</span>}
													</FormHelperText>
												</FormControl>

												<Controller
													control={control}
													name="cardNumber"
													rules={{
														required: {
															value: true,
														},
														min: {
															value: 16,
															message: "минимальное значение 16"
														}
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
														min: {
															value: 4,
															message: "минимальное значение 4"
														}
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
														min: {
															value: 3,
															message: "минимальное значение 3"
														}
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
											<Grid item xs={6}>
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
														<Typography variant="body1">{userCardData ? `${userCardData.expiryDate}` : '05/08'}</Typography>
													</Box>
													<Typography variant="body1">{userCardData ? `${userCardData.cardNumber}` : '5545 2300 3432 4521'}</Typography>
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