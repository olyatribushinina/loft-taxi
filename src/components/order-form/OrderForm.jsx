import React, { useState, useCallback } from 'react';
import Standart from '../../images/cars/standart.png';
import Premium from '../../images/cars/premium.png';
import Bisness from '../../images/cars/bisness.png';
import PropTypes from "prop-types";
import { connect, useDispatch } from 'react-redux';
import { Stack, Autocomplete, TextField, Paper, Grid, Button, Typography, CardMedia, Container } from '@mui/material';
import { getAdressList, getRouteData, resetRouteData, getUserCardData } from '../../actions/actions';
import moduleMapStyles from '../../pages/map/Map.module.css';
import moduleFormStyles from '../Form.module.css';
import { useForm } from 'react-hook-form';


function OrderForm({ adress, getRouteData, resetRouteData, isOrdered }) {

	const [inputValues, setInputValues] = useState({
		from: '', to: ''
	})

	const handleChange = useCallback(e => {
		const { name, value } = e.target;
		setInputValues({ ...inputValues, [name]: value });
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid }
	} = useForm({ mode: 'onChange' });

	const dispatch = useDispatch();

	const onSubmit = (data) => {
		const { from, to } = data;
		dispatch(getRouteData(from, to));
		reset();
	};

	return (
		!isOrdered
			?
			(<div className={moduleMapStyles.box} data-testid="order-form-component">
				<form name="RouteForm" onSubmit={handleSubmit(onSubmit)} className={moduleMapStyles.routeForm}>
					<Grid container>
						<Grid item xs={12} >
							<Paper elevation={1} className={moduleMapStyles.selectPaper}>
								<Stack spacing={0} className={moduleMapStyles.paperContainer}>
									<Autocomplete
										{...register("from", { required: true })}
										autoComplete
										includeInputInList
										options={adress.addresses.filter(i => i !== inputValues.to)}
										renderInput={(params) => <TextField {...params} name="from" label="откуда" onChange={handleChange} onSelect={handleChange} margin="dense" variant="standard" />}
									/>
									<Autocomplete
										{...register("to", { required: true })}
										autoComplete
										includeInputInList
										options={adress.addresses.filter(i => i !== inputValues.from)}
										renderInput={(params) => <TextField {...params} name="to" label="куда" onChange={handleChange} onSelect={handleChange} margin="dense" variant="standard" />}
									/>
								</Stack>
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper elevation={5} className={moduleMapStyles.radioPaper}>
								<Stack spacing={0} alignItems="center">
									<Stack direction="row" justifyContent="center">
										<input
											{...register('car', { required: true })}
											id="standart"
											type="radio"
											name="car"
											value="standart"
										/>
										<label htmlFor='standart'>
											<Paper elevation={3} className={moduleMapStyles.radioItem}>
												<Typography variant="body1">Стандарт</Typography>
												<Typography variant="inherit">Стоимость</Typography>
												<Typography variant="h6">150P</Typography>
												<CardMedia
													image={Standart}
													title="Standart car Image"
													className={moduleMapStyles.media}
													component='img'
												/>
											</Paper>
										</label>
										<input
											{...register('car', { required: true })}
											id="premium"
											type="radio"
											name="car"
											value="premium"
										/>
										<label htmlFor='premium'>
											<Paper elevation={3} className={moduleMapStyles.radioItem}>
												<Typography variant="body1">Премиум</Typography>
												<Typography variant="inherit">Стоимость</Typography>
												<Typography variant="h6">250P</Typography>
												<CardMedia
													image={Premium}
													title="Premium car Image "
													className={moduleMapStyles.media}
													component='img'
												/>
											</Paper>
										</label>
										<input
											{...register('car', { required: true })}
											id="bisness"
											type="radio"
											name="car"
											value="bisness"
										/>
										<label htmlFor='bisness'>
											<Paper elevation={3} className={moduleMapStyles.radioItem}>
												<Typography variant="body1">Бизнес</Typography>
												<Typography variant="inherit">Стоимость</Typography>
												<Typography variant="h6">300P</Typography>
												<CardMedia
													image={Bisness}
													title="Bisness car Image"
													className={moduleMapStyles.media}
													component='img'
												/>
											</Paper>
										</label>
									</Stack>
									<Button
										disabled={!isValid}
										type="submit"
										variant="contained"
										fullWidth
										sx={{ marginTop: "30px !Important" }}
									>
										Заказать
									</Button>
								</Stack>
							</Paper>
						</Grid>
					</Grid>
				</form>
			</div>)
			:
			(
				<div className={moduleMapStyles.box}>
					<Container className={moduleMapStyles.container}>
						<Paper className={moduleMapStyles.paper}>
							<Stack spacing="15px" alignItems="center">
								<h2 className={moduleFormStyles.messageBlockTitle}>Заказ размещен</h2>
								<p className={moduleFormStyles.messageBlockDescription}>Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.</p>
								<Button variant="contained" onClick={resetRouteData}>Сделать новый заказ</Button>
							</Stack>
						</Paper>
					</Container>
				</div>
			)
	)
}

OrderForm.propTypes = {
	isLoggedIn: PropTypes.bool,
	token: PropTypes.string,
	userCardData: PropTypes.object,
	// adress: PropTypes.array,
	isOrdered: PropTypes.bool,
	getAdressList: PropTypes.func,
	getRouteData: PropTypes.func,
	resetRouteData: PropTypes.func,
	getUserCardData: PropTypes.func
}

export default connect(
	state => ({
		isLoggedIn: state.auth.isLoggedIn,
		token: state.auth.token,
		userCardData: state.payment.userCardData,
		adress: state.adressList.adress,
		isOrdered: state.route.isOrdered
	}),
	{ getAdressList, getRouteData, resetRouteData, getUserCardData }
)(OrderForm);
