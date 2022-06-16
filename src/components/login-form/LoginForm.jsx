import React from 'react';
import PropTypes from "prop-types";
import { connect, useDispatch } from 'react-redux';
import { authenticate } from './../../actions/actions';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, Input, FormHelperText, Grid, Button, Stack } from '@mui/material';
import moduleFormStyles from '../Form.module.css';
import { useForm } from 'react-hook-form';

const LoginForm = ({ authenticate }) => {

	const {
		register,
		handleSubmit,
		formState: {
			errors, isValid
		}
	} = useForm({
		mode: 'onChange',
	});
	const dispatch = useDispatch()

	const onSubmit = async (data) => {
		const { email, password } = data;
		await dispatch(authenticate(email, password))
	};

	return (
		<div data-testid="login-form-component" >
			<div className={moduleFormStyles.form}>
				<h1 className={moduleFormStyles.title}>Войти</h1>
				<form name='LoginForm'
					onSubmit={handleSubmit(onSubmit)}
					data-testid="login-form">
					<Grid container
						spacing={0}
						direction="column">
						<Grid item>
							<FormControl fullWidth variant="standard">
								<InputLabel htmlFor="email" shrink>Email</InputLabel>
								<Input
									{...register('email', {
										required: {
											value: true,
											message: "Ведите адрес электронной почты"
										},
										pattern: {
											value: /^\S+@\S+$/i,
											message: "Введите корректный адрес электронной почты"
										}
									})}
									id="email"
									type="text"
									name="email"
									placeholder="mail@mail.ru"
									aria-describedby="email-helper-text"
								/>
								<FormHelperText
									id="email-helper-text">
									{errors.email && <span>{errors.email.message}</span>}
								</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item>
							<Stack direction="column">
								<FormControl fullWidth margin="normal" variant="standard">
									<InputLabel htmlFor="password" shrink>Пароль</InputLabel>
									<Input
										{...register('password', {
											required: {
												value: true,
												message: "Введите пароль"
											},
											minLength: {
												value: 2,
												message: "Пароль слишком короткий"
											},
										})}
										id="password"
										type="password"
										name="password"
										placeholder="********"
										aria-describedby="password-helper-text"
									/>
									<FormHelperText
										id="password-helper-text">
										{errors.password && <span>{errors.password.message}</span>}
									</FormHelperText>
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
						<Grid item mt={6} display="flex" justifyContent="center">
							<Button
								disabled={!isValid}
								variant="contained"
								fullWidth
								type="submit">
								Войти
							</Button>
						</Grid>
					</Grid>
				</form>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="center"
					mt={3}>
					<span>Новый пользователь?</span>
					<Button variant="text" color="primary" sx={{}}>
						<Link to="/registration" style={{ color: '#ffc617', fontSize: '14px' }}>Регистрация</Link>
					</Button>
				</Stack>
			</div>
		</div>
	)
}

LoginForm.propTypes = {
	isLoggedIn: PropTypes.bool,
	authenticate: PropTypes.func
}

export default connect(
	state => ({ isLoggedIn: state.auth.isLoggedIn }),
	{ authenticate }
)(LoginForm);
