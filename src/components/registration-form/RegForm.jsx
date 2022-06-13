import React from 'react';
// import Button from '../button/Button';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { registration } from './../../actions/actions';
import { Link } from 'react-router-dom';
import { Paper, FormControl, InputLabel, Input, FormHelperText, Typography, Box, Grid, Button, Stack } from '@mui/material';
import moduleFormStyles from '../Form.module.css';
import moduleButtonStyles from '../Button.module.css';

class RegForm extends React.Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool,
		registration: PropTypes.func
	}

	state = {
		email: ``,
		password: ``,
		name: ``,
		surname: ``
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password, name, surname } = this.state;
		this.props.registration(email, password, name, surname);

	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { email, name, surname, password } = this.state;

		return (
			<div data-testid="registration-form-component">
				<div className={moduleFormStyles.form}>
					<div className={moduleFormStyles.title}>Регистрация</div>
					<form
						name='RegForm'
						onSubmit={this.handleSubmit}
						data-testid="registration-form">
						<Grid container
							spacing={0}
							direction="column">
							<Grid item mb={3}>
								<FormControl fullWidth>
									<InputLabel htmlFor="email">Email*</InputLabel>
									<Input
										id="email"
										type="email"
										name="email"
										placeholder="mail@mail.ru"
										value={email}
										onChange={this.handleChange} />
								</FormControl>
							</Grid>
							<Grid item mb={3}>
								<Stack direction="column">
									<FormControl fullWidth>
										<InputLabel htmlFor="name">Имя*</InputLabel>
										<Input
											id="name"
											type="text"
											name="name"
											placeholder="Гомер"
											value={name}
											onChange={this.handleChange} />
									</FormControl>
								</Stack>
							</Grid>
							<Grid item mb={3}>
								<Stack direction="column">
									<FormControl fullWidth>
										<InputLabel htmlFor="surname">Фамилия*</InputLabel>
										<Input
											id="surname"
											type="text"
											name="surname"
											placeholder="Симпсон"
											value={surname}
											onChange={this.handleChange} />
									</FormControl>
								</Stack>
							</Grid>
							<Grid item mb={3}>
								<Stack direction="column">
									<FormControl fullWidth>
										<InputLabel htmlFor="password">Придумайте пароль*</InputLabel>
										<Input
											id="password"
											type="password"
											name="password"
											placeholder="********"
											value={password}
											onChange={this.handleChange} />
									</FormControl>
								</Stack>
							</Grid>
							<Grid item mb={4}>
								<Button variant="contained" fullWidth type="submit">Зарегистрироваться</Button>
							</Grid>
							<Grid item>
								<Stack direction="row" alignItems="center" justifyContent="center">
									<span>Уже зарегистрированы?</span>
									<Link
										className={moduleButtonStyles.themeColor}
										to="/">Войти</Link>
								</Stack>
							</Grid>
						</Grid>
					</form>
				</div>
			</div>
		)
	}
}

export default connect(
	(state) => ({ isLoggedIn: state.auth.isLoggedIn }),
	{ registration }
)(RegForm);
