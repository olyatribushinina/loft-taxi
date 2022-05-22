import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow, mount } from 'enzyme';
import { AuthContext } from './components/AuthContext';

describe('rendering App component', () => {
	it('renders App component without crashing', () => {
		const header = document.createElement('header');
		ReactDOM.render(<App />, header);
	});
})

describe('should render App component', () => {

	it('should contain <AuthContext.Comsumer />', () => {
		const component = shallow(<App />);
		let AuthContextComsumer = (<AuthContext.Consumer>
			{({ login, logout, isLoggedIn }) => (
				<Page navigateTo={this.navigateTo} />
			)}
		</AuthContext.Consumer>);
		expect(component.contains(AuthContextComsumer)).toEqual(true);
	})
})

describe('App handlers', () => {
	let component;

	beforeEach(() => {
		component = mount(<App />);
	});

	it('should handle change Page when click to Button children component', () => {
		expect(component.instance().state.currentPage).toBe('login')
		component.find('button').simulate('click')
		component.instance().navigateTo(page)
	});
})



