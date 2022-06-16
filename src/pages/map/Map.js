import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/header/Header';
import MapBox from '../../components/mapbox/MapBox';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Stack, Autocomplete, TextField } from '@mui/material'
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Button } from '@mui/material';
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import { getAdressList, getRouteData, getUserCardData } from '../../actions/actions';

function Map(props) {
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
			{
				storagePayment?.hasOwnProperty("cardNumber", "expiryDate", "cardName", "cvc")
					?
					(<Paper variant="elevation" square={true} id="routepoints">
						<form name="RouteForm" onSubmit={handleSubmit}>
							<Grid container>
								<Grid item xs={12}>
									<Stack spacing={0}>
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
								</Grid>
								<Grid item xs={12}>
									<FormControl>
										<RadioGroup
											row
											aria-labelledby="demo-row-radio-buttons-group-label"
											name="row-radio-buttons-group"
										>
											<FormControlLabel value="стандарт" control={<Radio />} label="Standart" />
											<FormControlLabel value="премиум" control={<Radio />} label="Premium" />
											<FormControlLabel value="бизнес" control={<Radio />} label="Bisness" />
										</RadioGroup>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<Button
										type="submit"
										variant="contained"
										color="inherit"
										fullWidth
									// className={classes.button}
									>
										Заказать
									</Button>

								</Grid>
							</Grid>
						</form>
					</Paper>)
					:
					(<Paper variant="elevation" square={true} id="routepoints">
						<Grid container>
							<Grid item xs={12}>
								<Typography color="inherit" variant="h4">Введите данные карты</Typography>
							</Grid>
							<Grid item xs={12}>
								<Button variant="contained" color="inherit" fullWidth>
									<Link to="/profile">Перейти в профиль</Link>
								</Button>
							</Grid>
						</Grid>
					</Paper>)
			}
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

export default connect(
	(state) => ({
		isLoggedIn: state.auth.isLoggedIn,
		userCardData: state.payment.userCardData,
		adress: state.adressList.adress
	}),
	{ getAdressList, getRouteData, getUserCardData }
)(Map);