import React, { useState } from 'react';

const AuthContext = React.createContext({});

const loginData = {
	email: 'test@test.com',
	password: '123123'
}

const AuthProvider = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const logIn = (email, password) => {
		if (email !== loginData.email || password !== loginData.password) {
			return;
		}

		setIsLoggedIn(true);
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
