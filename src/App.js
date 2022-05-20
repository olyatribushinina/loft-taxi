import React from 'react';
import Login from './pages/Login';
import Reg from './pages/Reg';
import Map from './pages/Map';
import Profile from './pages/Profile';
import { AuthContext } from './components/AuthContext';

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
		console.log(this.context.isLoggedIn)
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
