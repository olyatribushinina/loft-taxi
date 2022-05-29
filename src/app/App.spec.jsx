import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, screen } from "@testing-library/react";
import App from './App';
import { shallow, mount } from 'enzyme';
import { AuthContext } from './../context/AuthContext';
import Button from './../components/button/Button';

// describe('App', () => {
// 	describe('rendering App component', () => {
// 		it('renders App component without crashing', () => {
// 			const div = document.createElement('div');
// 			expect(div).not.toBeNull();
// 		});
// 	})

// 	describe('should render App component', () => {
// 		it('should contain <AuthContext.Comsumer />', () => {
// 			const component = shallow(<App />);
// 			let AuthContextComsumer = (<AuthContext.Consumer>
// 				{({ login, logout, isLoggedIn }) => (
// 					<Page navigateTo={this.navigateTo} />
// 				)}
// 			</AuthContext.Consumer>);
// 			expect(component.contains(AuthContextComsumer)).toEqual(true);
// 		})
// 	})

// 	describe('#navigateTo', () => {
// 		let navigateTo,
// 			className;

// 		beforeEach(() => {
// 			navigateTo = jest.fn();
// 			className = 'btn btn_text';
// 		});

// 		it('should call #navigateTo when click to Map Button', () => {
// 			const { getByText } = render(<Button className={className} callBack={() => navigateTo("map")} name="Карта" />);
// 			fireEvent.click(getByText(/Карта/i));
// 			expect(navigateTo).toHaveBeenCalled();
// 		});
// 		it('should call #navigateTo when click to Profile Button', () => {
// 			const { getByText } = render(<Button className={className} callBack={() => navigateTo("profile")} name="Профиль" />);
// 			fireEvent.click(getByText(/Профиль/i));
// 			expect(navigateTo).toHaveBeenCalled();
// 		});
// 		it('should call #navigateTo when click to LogState Button', () => {
// 			const { getByText } = render(<Button className={className} callBack={() => navigateTo("login")} name="Выйти" />);
// 			fireEvent.click(getByText(/Выйти/i));
// 			expect(navigateTo).toHaveBeenCalled();
// 		});
// 	})
// })

jest.mock("./../pages/Login", () => ({ Login: () => <div>Login content</div> }));
jest.mock("./../pages/Reg", () => ({ Reg: () => <div>Registration content</div> }));
jest.mock("./../pages/Map", () => ({ Map: () => <div>Map content</div> }));
jest.mock("./../pages/Profile", () => ({ Profile: () => <div>Profile content</div>, }));

describe("App", () => {
	it("renders correctly", () => {
		const mockStore = {
			getState: () => { },
			subscribe: () => { },
			dispatch: () => { },
		};
		const history = createMemoryHistory();
		const { container } = render(
			<Router history={history}>
				<Provider store={mockStore}>
					<App />
				</Provider>
			</Router>
		);
		expect(container.innerHTML).toMatch("Login content");
	});

	describe("when clicked on navigation buttons", () => {
		it("opens the corresponding page", () => {
			const mockStore = {
				getState: () => ({ auth: { isLoggedIn: true } }),
				subscribe: () => { },
				dispatch: () => { },
			};
			const history = createMemoryHistory();
			const { container, getByText } = render(
				<Router history={history}>
					<Provider store={mockStore}>
						<App />
					</Provider>
				</Router>
			);
			expect(container.innerHTML).toMatch("Login content");
			fireEvent.click(getByText("Map"));
			expect(container.innerHTML).toMatch("Map content");
			fireEvent.click(getByText("Profile"));
			expect(container.innerHTML).toMatch("Profile content");
		});
	});
});








