import React from 'react';
import Header from '../../components/header/Header';
import MapBox from '../../components/mapbox/MapBox';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Stack, Autocomplete, TextField } from '@mui/material'
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Button } from '@mui/material';
import { useTheme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import { getAdressList } from '../../actions/actions';
import { useEffect } from 'react';

function Map(props) {
	const theme = useTheme();
	let storageUserCardData = {};

	if (localStorage.length && localStorage.getItem('userCardData')) {
		storageUserCardData = JSON.parse(localStorage.getItem('userCardData'))
	}

	useEffect(() => {
		if (Object.keys(storageUserCardData).length) {
			props.getAdressList()
		}
	}, [])

	const handleFocus = (e) => {
		// console.log('focus')
	}

	const handleChange = (e) => {
		let filteredAdresses = adresses.filter(i => i !== e.target.value)
		console.log(filteredAdresses)
	}
	const handleSubmit = (e) => {
		e.preventDefault();
	}

	let adresses = Object.values(props.adress);
	return (
		<div data-testid="map-page">
			<Header />
			<MapBox />
			{
				storageUserCardData.hasOwnProperty("cardNumber", "expiryDate", "cardName", "cvc")
					?
					(<Paper variant="elevation" square={true} id="routepoints">
						<form name="RouteForm" onSubmit={handleSubmit}>
							<Grid container>
								<Grid item xs={12}>
									<Stack spacing={0}>
										<Autocomplete
											autoComplete
											includeInputInList
											options={adresses}
											renderInput={(params) => <TextField {...params} onFocus={handleFocus} onSelect={handleChange} label="откуда" margin="none" />}
										/>
										<Autocomplete
											autoComplete
											includeInputInList
											options={adresses}
											renderInput={(params) => <TextField {...params} label="куда" margin="none" onFocus={handleFocus} onSelect={handleChange} />}
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
	adress: PropTypes.object
}

export default connect(
	(state) => ({
		isLoggedIn: state.auth.isLoggedIn,
		userCardData: state.payment.userCardData,
		adress: state.adressList.adress
	}),
	{ getAdressList }
)(Map);