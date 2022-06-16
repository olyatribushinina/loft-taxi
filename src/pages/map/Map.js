import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/header/Header';
import MapBox from '../../components/mapbox/MapBox';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Paper, Button, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAdressList, getRouteData, getUserCardData } from '../../actions/actions';
import moduleMapStyles from './Map.module.css';
import OrderForm from '../../components/order-form/OrderForm';
import moduleFormStyles from '../../components/Form.module.css';

function Map(props) {
	const { userCardData } = props;

	useEffect(() => {
		if (Object.keys(userCardData)) {
			props.getAdressList()
		}
	}, [userCardData])

	return (
		<div data-testid="map-page">
			<Header />
			<MapBox />
			<section className={moduleMapStyles.section}>
				{
					userCardData?.hasOwnProperty("cardNumber", "expiryDate", "cardName", "cvc")
						?
						(<OrderForm />)
						:
						(
							< div className={moduleMapStyles.box}>
								<Container className={moduleMapStyles.container}>
									<Paper className={moduleMapStyles.paper}>
										<Stack spacing="15px">
											<h2 className={moduleFormStyles.messageBlockTitle}>Заполните платежные данные</h2>
											<p className={moduleFormStyles.messageBlockDescription}>Укажите информацию о банковской карте, чтобы сделать заказ.</p>
											<Button variant="contained" fullWidth>
												<Link to="/profile" style={{ color: '#000' }}>Перейти в профиль</Link>
											</Button>
										</Stack>
									</Paper>
								</Container>
							</div>
						)
				}
			</section>
		</div>
	)
}

Map.propTypes = {
	isLoggedIn: PropTypes.bool,
	token: PropTypes.string,
	userCardData: PropTypes.object,
	adress: PropTypes.object,
	getAdressList: PropTypes.func,
	getRouteData: PropTypes.func,
	getUserCardData: PropTypes.func
}

export default connect(
	state => ({
		isLoggedIn: state.auth.isLoggedIn,
		token: state.auth.token,
		userCardData: state.payment.userCardData,
		adress: state.adressList.adress
	}),
	{ getAdressList, getRouteData, getUserCardData }
)(Map);