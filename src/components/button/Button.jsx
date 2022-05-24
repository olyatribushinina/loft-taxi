import React from 'react';
import PropTypes from "prop-types";

const Button = ({ className, name, callBack }) => {
	return (
		<>
			<button type="button" className={className} onClick={callBack}><span>{name}</span></button>
		</>
	)
}

Button.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string,
	callBack: PropTypes.func
}

export default Button;