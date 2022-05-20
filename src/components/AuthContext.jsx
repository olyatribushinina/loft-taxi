import React, { useState } from 'react';

const AuthContext = React.createContext({});

const loginData = {
	email: 'welcome@mail.ru',
	password: '123'
}

const AuthProvider = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const logIn = (email, password) => {
		if (email !== loginData.email || password !== loginData.password) {
			alert("Неверно введены логин или пароль");
			return;
		}

		setIsLoggedIn(true);

		console.log(email === loginData.email);
		console.log(password === loginData.password);
		alert(isLoggedIn)
	};

	const logOut = () => {
		setIsLoggedIn(false);
		alert(isLoggedIn)
	};

	return (
		<AuthContext.Provider value={{ logIn, logOut, isLoggedIn }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider }
