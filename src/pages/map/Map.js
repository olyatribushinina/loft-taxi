import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/header/Header';
import MapBox from '../../components/mapbox/MapBox';
import Standart from '../../images/cars/standart.png';
import Premium from '../../images/cars/premium.png';
import Bisness from '../../images/cars/bisness.png';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Stack, Autocomplete, TextField } from '@mui/material'
import { Paper, Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Button } from '@mui/material';
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { getAdressList, getRouteData, getUserCardData } from '../../actions/actions';
import moduleMapStyles from './Map.module.css';
import CardMedia from '@mui/material/CardMedia';

const styles = theme => ({
	paper: {
		// boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.1)',
		// borderRadius: '20px',
		// position: 'absolute',
		// maxWidth: '30%',
		// // padding: '44px 60px',
		// marginTop: '48px',
		// marginBottom: '48px',
		// left: '20px',
		// minWidth: '384px'
	},
	link: {
		color: '#fff',
	},
	button: {
		backgroundColor: '#FDBF5A',
		borderRadius: ' 40px',
	}
})

function Map(props) {
	const { paper, link, button } = props.classes;
	let adresses = Object.values(props.adress);
	const storagePayment = JSON.parse(localStorage.getItem('userCardData'));

	const [inputValues, setInputValues] = useState({
		from: '', to: ''
	})

	const handleChange = useCallback(e => {
		const { name, value } = e.target;
		setInputValues({ ...inputValues, [name]: value });
	});

	useEffect(() => {
		if (storagePayment) {
			props.getAdressList()
		}
	}, [storagePayment])

	function handleSubmit(e) {
		e.preventDefault();
		if (Object.values(inputValues).length) {
			props.getRouteData(inputValues.from, inputValues.to);
		}
	}

	return (
		<div data-testid="map-page">
			<Header setStorageAuth={props.setStorageAuth} />
			<MapBox />
			<section className={moduleMapStyles.section}>
				{
					storagePayment?.hasOwnProperty("cardNumber", "expiryDate", "cardName", "cvc")
						?
						(<div className={moduleMapStyles.box}>
							<form name="RouteForm" onSubmit={handleSubmit}>
								<Grid container>
									<Grid item xs={12} >
										<Paper elevation={1} className={moduleMapStyles.selectPaper}>
											<Stack spacing={0} className={moduleMapStyles.paperContainer}>
												<Autocomplete
													autoComplete
													includeInputInList
													options={adresses.filter(i => i !== inputValues.to)}
													renderInput={(params) => <TextField {...params} name="from" label="откуда" onChange={handleChange} onSelect={handleChange} margin="dense" />}
												/>
												<Autocomplete
													autoComplete
													includeInputInList
													options={adresses.filter(i => i !== inputValues.from)}
													renderInput={(params) => <TextField {...params} name="to" label="куда" onChange={handleChange} onSelect={handleChange} margin="dense" />}
												/>
											</Stack>
										</Paper>
									</Grid>
									<Grid item xs={12}>
										<Paper elevation={5} className={moduleMapStyles.radioPaper}>
											<Stack spacing={0}>
												<Stack direction="row" justifyContent="center">
													<input id="standart" type="radio" name="car" value="standart" />
													<label htmlFor='standart'>
														<Paper elevation={3} rounded className={moduleMapStyles.radioItem}>
															<Typography variant="body1">Стандарт</Typography>
															<Typography variant="inherit">Стоимость</Typography>
															<Typography variant="h6">150P</Typography>
															<CardMedia
																style={{ backgroundImage: `url(${Standart})` }}
																className={moduleMapStyles.media}>
															</CardMedia>
														</Paper>

													</label>
													<input id="premium" type="radio" name="car" value="premium" />
													<label htmlFor='premium'>
														<Paper elevation={3} rounded className={moduleMapStyles.radioItem}>

															<Typography variant="body1">Премиум</Typography>
															<Typography variant="inherit">Стоимость</Typography>
															<Typography variant="h6">250P</Typography>
															<CardMedia
																style={{ backgroundImage: `url(${Premium})` }}
																className={moduleMapStyles.media}>
															</CardMedia>
														</Paper>
													</label>
													<input id="bisness" type="radio" name="car" value="bisness" />
													<label htmlFor='bisness'>
														<Paper elevation={3} rounded className={moduleMapStyles.radioItem}>
															<Typography variant="body1">Бизнес</Typography>
															<Typography variant="inherit">Стоимость</Typography>
															<Typography variant="h6">300P</Typography>
															<CardMedia
																style={{ backgroundImage: `url(${Bisness})` }}
																className={moduleMapStyles.media}>
															</CardMedia>
														</Paper>
													</label>
												</Stack>
												<Button
													type="submit"
													variant="contained"
													color="inherit"
													fullWidth
													sx={{ marginTop: "30px" }}
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
						(<Paper className={paper}>
							<Grid container spacing={6}>
								<Grid item xs={12}>
									<Typography align="center" color="inherit" variant="h4">Введите данные карты</Typography>
								</Grid>
								<Grid item xs={12}>
									<Button variant="contained" color="primary" className={button} fullWidth>
										<Link to="/profile" className={link}>Перейти в профиль</Link>
									</Button>
								</Grid>
							</Grid>
						</Paper>)
				}
			</section>
		</div>
	)
}

Map.propTypes = {
	isLoggedIn: PropTypes.bool,
	userCardData: PropTypes.object,
	adress: PropTypes.object,
	getAdressList: PropTypes.func,
	getRouteData: PropTypes.func
}

export default compose(
	connect(
		state => ({
			isLoggedIn: state.auth.isLoggedIn,
			userCardData: state.payment.userCardData,
			adress: state.adressList.adress
		}),
		{ getAdressList, getRouteData, getUserCardData }
	),
	withStyles(styles),
)(Map);