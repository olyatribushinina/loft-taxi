export const serverLogIn = async (email, password) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	};

	return await fetch('https://loft-taxi.glitch.me/auth', requestOptions)
		.then(r => r.json())
		.then(data => {
			if (data.success) {
				let token = data.token;
				localStorage.setItem('token', token);
				return data.success
			}
		})
};

export const serverRegistration = async (email, password, name, surname) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password, name, surname })
	};

	return await fetch('https://loft-taxi.glitch.me/register', requestOptions)
		.then(r => r.json())
		.then(data => {
			if (data.success) {
				// let userDetails = { 'email': email, 'name': name, 'surname': surname, token: data.token }
				let token = data.token;
				localStorage.setItem('token', token);
				return data.success
			}
		})
};

export const serverSaveProfileCardData = async (cardNumber, expiryDate, cardName, cvc, token) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cardNumber, expiryDate, cardName, cvc, token })
	};

	return await fetch('https://loft-taxi.glitch.me/card', requestOptions)
		.then(r => r.json())
		.then(data => {
			if (data.success) {
				const profileCardData = { 'cardNumber': cardNumber, 'expiryDate': expiryDate, 'cardName': cardName }
				localStorage.setItem('profileCardData', JSON.stringify(profileCardData));
				return data.success
			}
		})
};
