import React from 'react';
import Login from '../pages/login/Login';
import Reg from '../pages/registration/Reg';
import Map from '../pages/map/Map';
import Profile from '../pages/profile/Profile';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool
	}

	state = {
		storageAuth: {},
	}

	componentDidMount() {
		this.setState({ storageAuth: JSON.parse(localStorage.getItem('auth')) })
		const { storageAuth } = this.state;
		console.log(storageAuth)
	}

	componentDidUpdate(prevProps) {
		const { storageAuth } = this.state;
		if (this.props !== prevProps) {
			let prop = JSON.parse(localStorage.getItem('auth'));
			this.setStorage(prop)
		}

		// console.log(storageAuth)
	}

	setStorage = (prop) => {
		this.setState({ storageAuth: prop })
	}

	render() {
		const { storageAuth } = this.state;
		return (
			<>
				<Switch>

					{
						storageAuth?.isLoggedIn
							?
							(<>
								<Route path="/map" render={() => <Map storage={storageAuth} setStorageAuth={this.setStorage} />} />
								<Route path="/profile" render={() => <Profile storage={storageAuth} setStorageAuth={this.setStorage} />} />
								<Redirect to="/map" />

							</>)
							: (<>
								<Route exact path="/" component={Login} />
								<Route path="/registration" component={Reg} />
								<Redirect to="/" />
							</>)
					}

				</Switch>
			</>
		);
	}
}

export default connect(
	state => ({ isLoggedIn: state.auth.isLoggedIn })
)(App);