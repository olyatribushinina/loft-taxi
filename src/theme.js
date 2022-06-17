import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: { main: '#ffc617' },
		secondary: { main: '#1C1A19' }
	},
	components: {
		// Name of the component
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					textTransform: 'none'
				},
				containedPrimary: {
					fontSize: "1.3rem",
					boxShadow: "none",
					borderRadius: "70px",
					backgroundColor: "#FDBF5A",
					color: '#000',
					width: '100%',
					maxWidth: '350px',
					"&:focus": {
						backgroundColor: "#FFA842",
						boxShadow: "none",
					},
					"&:hover": {
						backgroundColor: "#FFA842",
						boxShadow: "none !Important",
					},
					"&:disabled": {
						backgroundColor: "##D8D7D5",
					},
				},

			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
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
					cursor: "pointer",
					position: "absolute",
					bottom: "-1.2em"
				}
			}
		},
		MuiInput: {
			styleOverrides: {
				root: {

				},
				underline: {
					"&:after": {
						"borderBottomColor": "#1473e6"
					}
				}
			}
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					color: 'red',
					margin: '0'
				},
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: '10px',
				}
			}
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					borderRadius: '0',
				}
			}
		},
		breakpoints: {
			values: {
				xxs: 0, // small phone
				xs: 300, // phone
				sm: 600, // tablets
				md: 900, // small laptop
				lg: 1200, // desktop
				xl: 1536 // large screens
			}
		}
	},
})
