import React from 'react';
import Login from './pages/Login';
import Reg from './pages/Reg';
import Map from './pages/Map';
import Profile from './pages/Profile';

const page = {
	login: Login,
	reg: Reg,
	map: Map,
	profile: Profile
}

class App extends React.Component {
	state = { currentPage: "login" }

	navigateTo = (page) => {
		this.setState({ currentPage: page })
	}

	render() {
		const Page = page[this.state.currentPage];
		return (
			<>
				<Page navigateTo={this.navigateTo} />
			</>
		);
	}
}

export default App;
