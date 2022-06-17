import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import RegForm from '../../components/registration-form/RegForm';
import Logo from './../../images/logo-main.svg';
import Background from '../../images/map.png';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Box, Grid, Stack } from '@mui/material';

const styles = theme => ({
	filled: {
		background: `center / cover no-repeat url(${Background})`
	},
	paper: {
		backgroundColor: '#1C1A19',
		padding: '52px 0 24px',
		['@media (min-width: 900px)']: {
			minHeight: '100vh',
			padding: '0'
		}
	},
	fullHeight: {
		['@media (min-width: 900px)']: {
			minHeight: '100vh',
		}
	}
})

function Reg(props) {
	const { filled, paper, fullHeight } = props.classes;
	return (
		<div data-testid="registration-page">
			<main className='maincontent'>
				<div className='container'>
					<Grid container spacing={0} className={fullHeight}>
						<Grid item md={4} xs={12}>
							<Box className={paper} p={1}>
								<Stack
									direction="row"
									justifyContent="center"
									alignItems="center"
									style={{ minHeight: 'inherit' }}>
									<div className="logo-main">
										<img src={Logo} className="App-logo" alt="logo" />
									</div>
								</Stack>
							</Box>
						</Grid>
						<Grid item md={8} xs={12} className={filled}>
							<Grid container
								alignItems="center"
								justifyContent="center"
								className={fullHeight}>
								<Grid item md={8} xs={12} >
									<Stack
										direction="row"
										justifyContent="center"
										alignItems="center"
										sx={{ minHeight: 'inherit' }}>
										<RegForm />
									</Stack>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</main>
		</div>
	)
}

Reg.propTypes = {
	isLoggedIn: PropTypes.bool
}

export default compose(
	connect(
		state => ({ isLoggedIn: state.auth.isLoggedIn })
	),
	withStyles(styles),
)(Reg);