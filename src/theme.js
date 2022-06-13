import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: { main: '#ffc617', dark: '#c27c23' }
	},
	components: {
		// Name of the component
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					textTransform: 'none !Important'
				},
				containedPrimary: {
					fontSize: "1.3rem !Important",
					boxShadow: "none !Important",
					borderRadius: "70px !Important",
					backgroundColor: "#FDBF5A !Important",
					"&:focus": {
						backgroundColor: "#FFA842 !Important",
						boxShadow: "none !Important",
					},
					"&:hover": {
						backgroundColor: "#FFA842 !Important",
						boxShadow: "none !Important",
					},
					"&:disabled": {
						backgroundColor: "##D8D7D5 !Important",
					},
				}
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					// transform: 'translateX(0) !Important',
					"&$focused": {
						color: "#1473e6"
					}
				}
			}
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: "#1473e6",
					cursor: "pointer"
				}
			}
		},
		MuiInput: {
			styleOverrides: {
				root: {

				},
				underline: {
					"&:after": {
						"border-bottom-color": "#1473e6"
					}
				}
			}
		},
		MuiLink: {
			styleOverrides: {
				root: {
					position: "absolute",
					bottom: "-1.2em"
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: '10px',
				}
			}
		},
	},
})
