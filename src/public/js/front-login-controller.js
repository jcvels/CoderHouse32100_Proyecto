const logInForm = document.getElementById('login-form');
const errorMsgsContainer = document.getElementById('error-msgs-container');
const infoMsgsContainer = document.getElementById('info-msgs-container');

let errorCounter = 0;

const stdMessages = {
	BLANK_EMAIL: 'Debe especificar un correo electrónico.',
	INVALID_EMAIL_AT: 'Debe ingresar un correo que contenga el símbolo "@".',
	INVALID_EMAIL_COM: 'Debe ingresar un correo que finalice en ".com".',
	BLANK_PASSWORD: 'Debe especificar una contraseña.',
	SHORT_PASSWORD: 'El password debe contener un mínimo de 8 caracteres.',
	NUMBERS_PASSWORD: 'El password debe contener por lo mínimo un número.',
	VALIDATING_CREDENTIALS: 'Validando sus credenciales...',
}

const setError = (message) => {
	errorCounter++;
	errorMsgsContainer.innerText += `${message}\n`;
}

const setInfo = (message) => {
	infoMsgsContainer.innerText = message;
}

logInForm.addEventListener('submit', (e) =>{
	e.preventDefault()

	const formData = new FormData(e.target);
	const inputsData = /* { mail: "jcvels@uvcoding.com.ar", password: "1234567890XXX" } */ Object.fromEntries(formData);
	
	errorMsgsContainer.innerText = '';
	infoMsgsContainer.innerText = '';
	errorCounter = 0;

	if( inputsData.mail.length < 1 ) setError(stdMessages.BLANK_EMAIL);
	if( inputsData.mail.includes('@') === false ) setError(stdMessages.INVALID_EMAIL_AT);
	if( inputsData.mail.includes('.com') === false ) setError(stdMessages.INVALID_EMAIL_COM);

	if( inputsData.password.length < 1 ) setError(stdMessages.BLANK_PASSWORD);
	if( inputsData.password.length < 8 ) setError(stdMessages.SHORT_PASSWORD);

	if( errorCounter === 0 ) {
		setInfo(stdMessages.VALIDATING_CREDENTIALS);

		const headers = new Headers()
		headers.append('Content-Type','application/json')
		const uri = '/api/auth/login'
		const options = {
			method: 'post',
			headers,
			body: JSON.stringify(inputsData)
		}

		fetch(uri, options)
			.then( data => data.json() )
			.then( data => {
				if( data.status === 'Success' ) {
					localStorage.setItem('token',data.token)
					logInForm.reset()
					setInfo('Welcome...')
					setTimeout( () => document.location.replace('/api/products'), 3000 );
				}
				else setError(data.message)
			})
			.catch( error => console.error(error) )
	}

})