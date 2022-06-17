// POST 

export const serverLogIn = async (email, password) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	};

	return await fetch('https://loft-taxi.glitch.me/auth', requestOptions)
		.then((res) => {
			if (res.ok) {
				// console.log(res)
				return res;
			} else {
				let error = new Error(res.statusText);
				error.response = res;
				throw error
			}
		})
		.then(r => r.json())
		.then(data => data)
		.catch((e) => {
			console.log('Error: ' + e.message);
			console.log(e.response);
		});
};

export const serverRegistration = async (email, password, name, surname) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password, name, surname })
	};

	return await fetch('https://loft-taxi.glitch.me/register', requestOptions)
		.then((res) => {
			if (res.ok) {
				return res;
			} else {
				let error = new Error(res.statusText);
				error.response = res;
				throw error
			}
		})
		.then(r => r.json())
		.then(data => data)
		.catch((e) => {
			console.log('Error: ' + e.message);
			console.log(e.response);
		});
};

export const serverPostCardData = async (cardNumber, expiryDate, cardName, cvc, token) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cardNumber, expiryDate, cardName, cvc, token })
	};

	return await fetch('https://loft-taxi.glitch.me/card', requestOptions)
		.then((res) => {
			if (res.ok) {
				return res;
			} else {
				let error = new Error(res.statusText);
				error.response = res;
				throw error
			}
		})
		.then(r => r.json())
		.then(data => data.success)
		.catch((e) => {
			console.log('Error: ' + e.message);
			console.log(e.response);
		});
};

// GET 

export const serverGetCardData = async (token) => {

	return await fetch(`https://loft-taxi.glitch.me/card?token=${token}`)
		.then((res) => {
			if (res.ok) {
				return res;
			} else {
				let error = new Error(res.statusText);
				error.response = res;
				throw error
			}
		})
		.then(r => r.json())
		.then(data => data)
		.catch((e) => {
			console.log('Error: ' + e.message);
			console.log(e.response);
		});
};

export const serverGetAdressList = async () => {

	return await fetch('https://loft-taxi.glitch.me/addressList', { method: 'GET' })
		.then((res) => {
			if (res.ok) {
				// alert(res)
				return res;
			} else {
				let error = new Error(res.statusText);
				error.response = res;
				throw error
			}
		})
		.then(r => r.json())
		.then(data => data)
		.catch((e) => {
			console.log('Error: ' + e.message);
			console.log(e.response);
		})
};

export const serverGetCoords = async (from, to) => {

	return await fetch(`https://loft-taxi.glitch.me/route?address1=${from}&address2=${to}`, { method: 'GET' })
		.then((res) => {
			if (res.ok) {
				return res;
			} else {
				let error = new Error(res.statusText);
				error.response = res;
				throw error
			}
		})
		.then(r => r.json())
		.then(data => data)
		.catch((e) => {
			console.log('Error: ' + e.message);
			console.log(e.response);
		})
};