import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/header/Header';
import MapBox from '../../components/mapbox/MapBox';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Paper, Grid, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { getAdressList, getRouteData, getUserCardData } from '../../actions/actions';
import moduleMapStyles from './Map.module.css';
import { styled } from '@mui/material/styles';
import OrderForm from '../../components/order-form/OrderForm';

const styles = theme => ({

})

function Map(props) {

	let storagePayment = JSON.parse(localStorage.getItem('userCardData'));

	useEffect(() => {
		if (storagePayment) {
			props.getAdressList()
		}
	}, [storagePayment])

	return (
		<div data-testid="map-page">
			<Header setStorageAuth={props.setStorageAuth} />
			<MapBox />
			<section className={moduleMapStyles.section}>
				{
					storagePayment?.hasOwnProperty("cardNumber", "expiryDate", "cardName", "cvc")
						?
						(<OrderForm />)
						:
						(
							<Container className={moduleMapStyles.container}>
								<div className={moduleMapStyles.box}>
									<Paper className={moduleMapStyles.paper}>
										<Grid container spacing={6}>
											<Grid item xs={12}>
												<Typography align="center" color="inherit" variant="h4">Заполните платежные данные</Typography>
												<Typography align="center" color="inherit" variant="body1">Укажите информацию о банковской карте, чтобы сделать заказ.</Typography>
											</Grid>
											<Grid item xs={12}>
												<Button variant="contained" fullWidth>
													<Link to="/profile">Перейти в профиль</Link>
												</Button>
											</Grid>
										</Grid>
									</Paper>
								</div>
							</Container>
						)
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
			token: state.auth.token,
			userCardData: state.payment.userCardData,
			adress: state.adressList.adress
		}),
		{ getAdressList, getRouteData, getUserCardData }
	),
	withStyles(styles),
)(Map);