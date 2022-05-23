import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { AuthContext, AuthProvider } from './AuthContext';
import Button from './Button';

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

	describe('LogState Button click ', () => {
		let isLoggedIn,
			logOut,
			className;

		beforeEach(() => {
			logOut = jest.fn();
			className = 'btn btn_text';
		});

		it('should call logOut method when click to LogState Button and set "isLoggedIn" to false', () => {
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

			const { getByText } = render(<Button className={className} callBack={logOut} name="Выйти" />);
			fireEvent.click(getByText(/Выйти/i));
			expect(logOut).toHaveBeenCalled();
			expect(isLoggedIn).toBe(false)
		});
	})
})

