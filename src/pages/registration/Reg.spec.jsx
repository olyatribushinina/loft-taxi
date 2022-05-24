import React from 'react';
import ReactDOM from 'react-dom';
import Reg from './Reg';
import RegForm from '../../components/registration-form/RegForm';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';

const props = {
	navigateTo: (page) => {
		this.context.isLoggetIn === false
			? this.setState({ currentPage: 'login' })
			: this.setState({ currentPage: page })
	}
}

const setUp = (props) => shallow(<Reg {...props} />)

describe('rendering Registration component', () => {
	it('renders Registration component without crashing', () => {
		const div = document.createElement('div');
		expect(div).not.toBeNull();
	});

	it('should render Registration component with props', () => {
		const component = setUp(props);
		const main = component.find('main');
		expect(main).toHaveLength(1);
	});
})

describe('should render Registration component', () => {
	let component;

	beforeEach(() => {
		component = shallow(<Reg />);
	});

	it('should contain main', () => {
		const main = component.find('main');
		expect(main).toHaveLength(1);
	})

	it('should contain <h1>Регистрация</h1>', () => {
		const header = (<h1>Регистрация</h1>);
		expect(component.contains(header)).toEqual(true);
	})

	it('should contain <RegForm />', () => {
		expect(component.contains(<RegForm />)).toEqual(true);
	})
})
