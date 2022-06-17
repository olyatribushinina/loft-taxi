import React from 'react';
import PropTypes from "prop-types";
import { connect, useDispatch } from 'react-redux';
import { registration } from './../../actions/actions';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, Input, FormHelperText, Grid, Button, Stack } from '@mui/material';
import moduleFormStyles from '../Form.module.css';
import { useForm } from 'react-hook-form';

const RegForm = ({ registration }) => {

	const {
		register,
		handleSubmit,
		formState: {
			errors, isValid
		}
	} = useForm({
		mode: 'onChange'
	});
	const dispatch = useDispatch()

	const onSubmit = async (data) => {
		const { email, password, name, surname } = data;
		await dispatch(registration(email, password, name, surname))
	};

	return (
		<div data-testid="registration-form-component">
			<div className={moduleFormStyles.form}>
				<div className={moduleFormStyles.title}>Регистрация</div>
				<form
					name='RegForm'
					onSubmit={handleSubmit(onSubmit)}
					data-testid="registration-form">
					<Grid container
						spacing={0}
						direction="column"
					>
						<Grid item mb={3}>
							<FormControl fullWidth variant="standard">
								<InputLabel htmlFor="email" shrink>Email*</InputLabel>
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
						<Grid item mb={3}>
							<Stack
								sx={{
									flexDirection: {
										md: "row",
									},
									gap: {
										md: "10px",
										xs: "24px",
									}
								}}
							>
								<FormControl fullWidth variant="standard">
									<InputLabel htmlFor="name" shrink>Имя*</InputLabel>
									<Input
										{...register('name', {
											required: {
												value: true,
												message: "Введите имя"
											},
										})}
										id="name"
										type="text"
										name="name"
										placeholder="Гомер"
										aria-describedby="name-helper-text"
									/>
									<FormHelperText
										id="name-helper-text">
										{errors.name && <span>{errors.name.message}</span>}
									</FormHelperText>
								</FormControl>
								<FormControl fullWidth variant="standard">
									<InputLabel htmlFor="surname" shrink>Фамилия*</InputLabel>
									<Input
										{...register('surname', {
											required: {
												value: true,
												message: "Введите Фамилию"
											},
										})}
										id="surname"
										type="text"
										name="surname"
										placeholder="Симпсон"
										aria-describedby="surname-helper-text"
									/>
									<FormHelperText
										id="surname-helper-text">
										{errors.surname && <span>{errors.surname.message}</span>}
									</FormHelperText>
								</FormControl>
							</Stack>
						</Grid>
						<Grid item mb={3}>
							<FormControl fullWidth variant="standard">
								<InputLabel htmlFor="password" shrink>Придумайте пароль*</InputLabel>
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
						</Grid>
						<Grid item mt={4} display="flex" justifyContent="center">
							<Button
								disabled={!isValid}
								variant="contained"
								fullWidth type="submit">
								Зарегистрироваться
							</Button>
						</Grid>
						<Stack
							mt={3}
							direction="row"
							alignItems="center"
							justifyContent="center">
							<span>Уже зарегистрированы?</span>
							<Button variant="text" color="primary">
								<Link to="/" style={{ color: '#ffc617', fontSize: '14px' }}>Войти</Link>
							</Button>
						</Stack>
					</Grid>
				</form>
			</div>
		</div>
	)
}

RegForm.propTypes = {
	isLoggedIn: PropTypes.bool,
	registration: PropTypes.func
}

export default connect(
	(state) => ({ isLoggedIn: state.auth.isLoggedIn }),
	{ registration }
)(RegForm);
