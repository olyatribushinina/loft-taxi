import React from 'react';

const Button = ({ className, name, callBack }) => {
	return (
		<button type="button" className={className} onClick={callBack}><span>{name}</span></button>
	)
}

export default Button;