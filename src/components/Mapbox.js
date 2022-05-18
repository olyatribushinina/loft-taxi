import React from 'react';
import ReactDOM from 'react-dom/client';

mapboxgl.accessToken = 'pk.eyJ1Ijoib2x5YWJhZGdlciIsImEiOiJjbDNiM3R0bGwwOWhtM2hzNzM3OTIwZzhwIn0.Z3l9IZKmff94rMwL6IDrdA';

class Map extends React.Component {
	componentDidMount() {
		this.map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v9'
		});
	}

	componentWillUnmount() {
		this.map.remove();
	}

	render() {
		const style = {
			position: 'absolute',
			top: 0,
			bottom: 0,
			width: '100%'
		};

		return <div style={style} ref={el => this.mapContainer = el} />;
	}
}

ReactDOM.render(<Map />, document.getElementById('app'));  