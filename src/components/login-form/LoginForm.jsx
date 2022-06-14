import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { authenticate } from './../../actions/actions';
import { Link } from 'react-router-dom';
import { Paper, FormControl, InputLabel, Input, FormHelperText, Typography, Box, Grid, Button, Stack } from '@mui/material';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import moduleFormStyles from '../Form.module.css';

const styles = theme => ({
})

class LoginForm extends React.Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool,
		authenticate: PropTypes.func
	}

	state = {
		email: ``,
		password: ``
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		this.props.authenticate(email, password);
		// console.log(this.props.isLoggedIn)
		this.handleReset();
	};

	handleReset = e => {
		this.setState({ email: '', password: '' })
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { email, password } = this.state;
		const { formBox } = this.props.classes;
		// console.log(this.props)
		return (
			<div data-testid="login-form-component">
				<div className={moduleFormStyles.form}>
					<h1 className={moduleFormStyles.title}>Войти</h1>
					<form name='LoginForm'
						onSubmit={this.handleSubmit}
						data-testid="login-form">
						<Grid container
							spacing={0}
							direction="column">
							<Grid item>
								<FormControl fullWidth>
									<InputLabel htmlFor="email">Email</InputLabel>
									<Input
										id="email"
										type="email"
										name="email"
										placeholder="mail@mail.ru"
										value={email}
										onChange={this.handleChange} />
								</FormControl>
							</Grid>
							<Grid item>
								<Stack direction="column">
									<FormControl fullWidth margin="normal">
										<InputLabel htmlFor="password">Пароль</InputLabel>
										<Input
											id="password"
											type="password"
											name="password"
											placeholder="********"
											value={password}
											onChange={this.handleChange} />
									</FormControl>
									<Button sx={{
										alignSelf: 'flex-end',
										textTransform: 'none',
										color: '#828282',
										"&.MuiButtonBase-root:hover": { bgcolor: "transparent" }
									}}>
										Забыли пароль
									</Button>
								</Stack>
							</Grid>
							<Grid item mt={4}>
								{/* <input type="submit"
									className={moduleButtonStyles.themeBackgroundColor}
									placeholder="Войти"
									defaultValue="Войти" /> */}
								<Button variant="contained" fullWidth type="submit">Войти</Button>
							</Grid>
						</Grid>
					</form>

					<Stack
						direction="row"
						alignItems="center"
						justifyContent="center"
						mt={3}>
						<span>Новый пользователь?</span>
						<Link
							to="/registration">Регистрация
						</Link>
					</Stack>
				</div>
			</div>
		)
	}
}


export default compose(
	connect(
		state => ({ isLoggedIn: state.auth.isLoggedIn }),
		{ authenticate }
	),
	withStyles(styles),
)(LoginForm);
