export const serverLogIn = async (email, password) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	};

	return await fetch('https://loft-taxi.glitch.me/auth', requestOptions)
		.then(r => r.json())
		.then(data => data.success)
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
				const userDetails = { 'email': email, 'name': name, 'surname': surname, token: data.token }
				localStorage.setItem('userDetails', JSON.stringify(userDetails));
				return data.success
			}
		})
};

export const serverSaveProfileCardData = async (cardHolderName, cardNumber, cardDate, cardCVC) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cardHolderName, cardNumber, cardDate, cardCVC })
	};

	return await fetch('https://loft-taxi.glitch.me/card', requestOptions)
		.then(r => r.json())
		.then(data => {
			if (data.success) {
				const profileCardData = { 'cardHolderName': cardHolderName, 'cardNumber': cardNumber, 'cardDate': cardDate, 'cardCVC': cardCVC }
				localStorage.setItem('profileCardData', JSON.stringify(profileCardData));
				return data.success
			}
		})
};
