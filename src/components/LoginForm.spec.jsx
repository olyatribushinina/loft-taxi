import React from 'react';
import ReactDOM from 'react-dom';
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

const setUp = (props) => shallow(<LoginForm {...props} />)

describe('rendering LoginForm component', () => {
	it('renders LoginForm component without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<LoginForm />, div);
	});

	it('should render LoginForm component with props', () => {
		const component = setUp(props);
		const form = component.find('.form');
		expect(form).toHaveLength(1);
	});
})

describe('should render LoginForm component', () => {
	let component;

	beforeEach(() => {
		component = shallow(<LoginForm />);
	});

	it('should contain one <form>', () => {
		const form = component.find('form');
		expect(form.length).toBe(1);
	})

	it('should contain two <label>', () => {
		expect(component.find('label')).toHaveLength(2);
	});
})

describe('LoginForm handlers', () => {
	let component;

	beforeEach(() => {
		component = shallow(<LoginForm />);
	});

	it('should handle onChange email input setState value ', () => {
		expect(component.instance().state.email).toBe('')
		component.find('input[name="email"]').simulate('change')
		component.instance().handleChange()
		expect(component.instance().state.email).not.toBe('')
	});

	it('should handle onChange password input value "123" ', () => {
		expect(component.instance().state.password).toBe('')
		component.find('input[name="password"]').simulate('change')
		component.instance().handleChange()
		expect(component.instance().state.password).not.toBe('')
	});

	it('should handle onSubmit change isLoggedIn property ', () => {
		expect(component.instance().state.email).toBe('welcome@mail.ru')
		expect(component.instance().state.password).toBe('123')
		component.find('form').simulate('submit')
		component.instance().handleSubmit(e)
		expect(component.instance().context.isLoggetIn).toBe(true)
		component.instance().props.navigateTo();
	});

	it('should handle onSubmit reset form fields ', () => {
		component.find('form').simulate('submit')
		component.instance().handleReset()
		expect(component.instance().state.email).toBe('')
		expect(component.instance().state.password).toBe('')
	});
})
