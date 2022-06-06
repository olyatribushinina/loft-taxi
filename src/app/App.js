import React from 'react';
import Login from '../pages/login/Login';
import Reg from '../pages/registration/Reg';
import Map from '../pages/map/Map';
import Profile from '../pages/profile/Profile';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {

	render() {
		let storageAuth = {}

		if (localStorage.length && localStorage.getItem('auth')) {
			storageAuth = JSON.parse(localStorage.getItem('auth'))
		}
		console.log(storageAuth)

		return (
			<>
				<Switch>

					{
						storageAuth.isLoggedIn
							?
							(<>
								<Route path="/map" component={Map} />
								<Route path="/profile" component={Profile} />
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

App.propTypes = {
	isLoggedIn: PropTypes.bool
}

export default connect(
	state => ({ isLoggedIn: state.auth.isLoggedIn })
)(App);
