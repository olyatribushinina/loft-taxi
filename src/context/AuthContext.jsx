import React, { useState } from 'react';

const AuthContext = React.createContext({});

const loginData = {
	email: 'welcome@mail.ru',
	password: '123123'
}


const AuthProvider = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const logIn = (email, password, name, surname) => {

		if (email && password && name && surname) {
			localStorage.setItem('userEmail', email);
			localStorage.setItem('userPassword', password);
			localStorage.setItem('userName', name);
			localStorage.setItem('userSurname', surname);
		}

		let user = {
			userEmail: localStorage.getItem("userEmail"),
			userPassword: localStorage.getItem("userPassword"),
			userName: localStorage.getItem("userName"),
			userSurname: localStorage.getItem("userSurname")
		}

		console.log(user)

		if (!name && !surname) {
			if (email !== user.userEmail || password !== user.userPassword) {
				return;
			}
		}

		setIsLoggedIn(true);
		console.log(`Привет, ${user.userName} ${user.userSurname}!`);
	};

	const logOut = () => {
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ logIn, logOut, isLoggedIn }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider }
