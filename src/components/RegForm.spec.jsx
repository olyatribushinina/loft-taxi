import React from 'react';
import ReactDOM from 'react-dom';
import RegForm from './RegForm';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';


const props = {
	navigateTo: (page) => {
		this.context.isLoggetIn === false
			? this.setState({ currentPage: 'login' })
			: this.setState({ currentPage: page })
	}
}

const setUp = (props) => shallow(<RegForm {...props} />)

describe('rendering RegForm component', () => {
	it('renders RegForm component without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<RegForm />, div);
	});

	it('should render RegForm component with props', () => {
		const component = setUp(props);
		const form = component.find('.form');
		expect(form).toHaveLength(1);
	});
})

describe('should render RegForm component', () => {
	let component;

	beforeEach(() => {
		component = shallow(<RegForm />);
	});

	it('should contain one <form>', () => {
		const form = component.find('form');
		expect(form.length).toBe(1);
	})

	it('should contain three <label>', () => {
		expect(component.find('label')).toHaveLength(3);
	});

})

describe('RegForm handlers', () => {
	let component;

	beforeEach(() => {
		component = shallow(<RegForm />);
	});

	it('should handle onChange email input setState value ', () => {
		expect(component.instance().state.email).toBe('')
		component.find('input[name="email"]').simulate('change')
		component.instance().handleChange()
		expect(component.instance().state.email).toBe({ [e.target.name]: e.target.value })
	});

	it('should handle onChange name input setState value ', () => {
		expect(component.instance().state.name).toBe('')
		component.find('input[name="name"]').simulate('change')
		component.instance().handleChange()
		expect(component.instance().state.name).toBe({ [e.target.name]: e.target.value })
	});

	it('should handle onChange password input value "123" ', () => {
		expect(component.instance().state.password).toBe('')
		component.find('input[name="password"]').simulate('change')
		component.instance().handleChange()
		expect(component.instance().state.password).not.toBe('')
	});

	it('should handle onSubmit change isLoggedIn property ', () => {
		component.find('form').simulate('submit')
		component.instance().props.navigateTo();
		expect(component.instance().context.isLoggetIn).toBe(true)
	});

	it('should handle onSubmit reset form fields ', () => {
		component.find('form').simulate('submit')
		component.instance().handleReset()
		expect(component.instance().state.email).toBe('')
		expect(component.instance().state.password).toBe('')
	});
})
