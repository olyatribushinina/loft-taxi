import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import LoginForm from '../components/LoginForm';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';

const props = {
	navigateTo: (page) => {
		this.context.isLoggetIn === false
			? this.setState({ currentPage: 'login' })
			: this.setState({ currentPage: page })
	}
}

const setUp = (props) => shallow(<Login {...props} />)

describe('rendering Login component', () => {
	it('renders Login component without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Login />, div);
	});

	it('should render Login component with props', () => {
		const component = setUp(props);
		const main = component.find('main');
		expect(main).toHaveLength(1);
	});
})

describe('should render Login component', () => {
	let component;

	beforeEach(() => {
		component = shallow(<Login />);
	});

	it('should contain <h1>Логин</h1>', () => {
		const header = (<h1>Логин</h1>);
		expect(component.contains(header)).toEqual(true);
	})

	it('should contain <LoginForm />', () => {
		expect(component.contains(<LoginForm />)).toEqual(true);
	})
})
