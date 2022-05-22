import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { AuthContext, AuthProvider } from './AuthContext';

describe('AuthContext', () => {
	describe('#logIn', () => {
		it('set "isLoggedIn" to true ', () => {
			let isLoggedIn;
			let logIn;

			render(
				<AuthProvider>
					<AuthContext.Consumer>
						{(value) => {
							isLoggedIn = value.isLoggedIn;
							logIn = value.logIn;
							return null;
						}}
					</AuthContext.Consumer>
				</AuthProvider>
			)

			expect(isLoggedIn).toBe(false)

			act(() => {
				logIn('welcome@mail.ru', '123')
			})

			expect(isLoggedIn).toBe(true)
		})
	})

	describe('#logOut', () => {
		it('set "isLoggedIn" to false ', () => {
			let isLoggedIn;

			render(
				<AuthProvider>
					<AuthContext.Consumer>
						{(value) => {
							isLoggedIn = value.isLoggedIn;
							return null;
						}}
					</AuthContext.Consumer>
				</AuthProvider>
			)
			expect(isLoggedIn).toBe(false)
		})
	})
})