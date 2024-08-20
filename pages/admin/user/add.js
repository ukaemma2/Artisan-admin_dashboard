import { makeStyles} from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-dashboard/views/loginStyle.js';
import Card from 'components/Card/Card.js';
import Container from '@material-ui/core/Container';
import CardHeader from 'components/Card/CardHeader.js';
import Admin from 'layouts/Admin.js';
import CardBody from 'components/Card/CardBody.js';
import { useRouter } from 'next/router';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import React, { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { authAxios, parseCookies, UNAUTHENTICATED_RESPONSE } from '../../../utility/apihelp';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}
const useStyless = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
	table: {
		minWidth: 700,
	},
	cardCategoryWhite: {
		color: 'rgba(255,255,255,.62)',
		margin: '0',
		fontSize: '14px',
		marginTop: '0',
		marginBottom: '0',
	},
	cardTitleWhite: {
		color: '#FFFFFF',
		marginTop: '0px',
		minHeight: 'auto',
		fontWeight: '500',
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: '3px',
		textDecoration: 'none',
		textAlign: 'center',
	},
	searchWrapper: {
		textAlign: 'center',
		marginBottom: '2em',
	},
	input: {
		display: 'none',
	},
	button: {
		color: 'purple',
		margin: 10,
	},
	secondaryButton: {
		color: 'gray',
		margin: 10,
	},
}))

import { Grid, TextField, Button, CircularProgress, Fab } from '@material-ui/core'


export const getServerSideProps = async ({ req }) => {
	const token = parseCookies(req);
	const props = { token };
	if (!token) return UNAUTHENTICATED_RESPONSE;

	  return {
	    props,
	  };
  };

const Add = ({token}) => {
	const router = useRouter()
	const useStyles = makeStyles(styles)
	const classes = useStyles()
	const classess = useStyless()
	const [loading, setLoading] = useState()
	const [error, setError] = useState('')
	const [suc, setSuccess] = useState('')
	const [message, setMessage] = useState("");
	const first_name = useFormInput('')
	const last_name = useFormInput('')
	const email = useFormInput('')
	const phone_number = useFormInput('')
	const address = useFormInput('')
	const password = useFormInput('')
	const lat = useFormInput('')
	const long = useFormInput('')



	const handleCreateAtizans = async e => {
		e.preventDefault()

		const users = {
			first_name: first_name.value,
			last_name: last_name.value,
			email: email.value,
			phone_number: phone_number.value,
			address: address.value,
			geo_location: {
				type: 'Point',
				coordinates: [parseFloat(long.value), parseFloat(lat.value)],
			},
			password: password.value,
		}
		setError(null)
		setLoading(true)

		try {
			await authAxios(token).post(`/admins/users/create`, users)
			setLoading(false)
			setSuccess('Artizan added successfully')
			return setTimeout(() => router.push('/admin/users'), 2000)
		} catch (error) {
			setLoading(false)
			if (error.response.status === 401 || error.response.status === 400) setError(error.response.data.message)
			else {
				setError('Something went wrong, please try again')
			}
		}
	}

	return (
		<div>
			{message && <Alert severity="error">{message}</Alert>}
			{suc && <Alert severity="success">{suc}</Alert>}
			<div className={classes.cardsbodies}></div>
			<Container sm="true">
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={2}></Grid>
					<Grid item xs={12} sm={12} md={8}>
						<Card>
							<CardHeader color="primary">
								<h4 className={classes.cardTitleWhitew}>Add Users</h4>
								<p className={classes.cardCategoryWhitew}>The choice is yours</p>
							</CardHeader>
							<CardBody>
								<Container sm="true">
									<form onSubmit={handleCreateAtizans} autoComplete="email">
										<Grid item xs={12} sm={12} md={12} className={classes.formControl}>
											<TextField fullWidth type="text" label="First Name" color="primary" required {...first_name} />
											<TextField fullWidth type="text" label="Last Name" color="primary" required {...last_name} />
											<TextField fullWidth type="Email" label="Email" color="primary" required {...email} />

											<TextField fullWidth type="text" label="Phone Number" color="primary" required {...phone_number} />
											<TextField fullWidth type="text" label="Address" color="primary" required {...address} />

											<TextField fullWidth type="text" label="Long" color="primary" {...long} />
											<TextField fullWidth type="text" label="Lat" color="primary" required {...lat} />
											<TextField fullWidth label="Password" type="password" color="primary" required {...password} />
											<div>Upload your certificate</div>
											<TextField fullWidth accept="image/*" className={classess.input} id="contained-button-file" multiple label="" type="file" />
											<label htmlFor="contained-button-file">
												<Fab component="span" className={classess.button}>
													<AddPhotoAlternateIcon />
												</Fab>
											</label>
											<Button fullWidth type="submit" variant="contained" className={classes.button} disabled={loading}>
												{loading && <CircularProgress size={16} />}
												{!loading && 'Create user'}
											</Button>
											{error && <Alert severity="error">{error}</Alert>}
										</Grid>
									</form>
								</Container>
							</CardBody>
						</Card>
					</Grid>
					<Grid item xs={12} sm={12} md={2}></Grid>
				</Grid>
			</Container>
		</div>
	)
}

const useFormInput = initialValue => {
	const [value, setValue] = useState(initialValue)

	const handleChange = e => {
		setValue(e.target.value)
	}
	return {
		value,
		onChange: handleChange,
	}
}

Add.layout = Admin
export default Add
