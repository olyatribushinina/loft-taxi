import React from 'react';
import Login from '../pages/login/Login';
import Reg from '../pages/registration/Reg';
import Map from '../pages/map/Map';
import Profile from '../pages/profile/Profile';
import { AuthContext } from '../context/AuthContext';

const page = {
	login: Login,
	reg: Reg,
	map: Map,
	profile: Profile
}

class App extends React.Component {
	state = { currentPage: "login" };
	static contextType = AuthContext;

	navigateTo = (page) => {
		this.context.isLoggetIn === false
			? this.setState({ currentPage: 'login' })
			: this.setState({ currentPage: page })
	}

	render() {
		const Page = page[this.state.currentPage];

		return (
			<>
				<AuthContext.Consumer>
					{({ login, logout, isLoggedIn }) => (
						<Page navigateTo={this.navigateTo} />
					)}
				</AuthContext.Consumer>
			</>
		);
	}
}

export default App;
