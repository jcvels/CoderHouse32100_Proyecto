const signUpForm = document.getElementById('signup-form');
const errorMsgsContainer = document.getElementById('error-msgs-container');
const infoMsgsContainer = document.getElementById('info-msgs-container');

const stdMessages = {
	BLANK_NAME: 'Debe especificar un nombre',
	BLANK_EMAIL: 'Debe especificar un correo electrónico.',
	INVALID_EMAIL_AT: 'Debe ingresar un correo que contenga el símbolo "@".',
	INVALID_EMAIL_COM: 'Debe ingresar un correo que finalice en ".com".',
	BLANK_PASSWORD: 'Debe especificar una contraseña.',
	SHORT_PASSWORD: 'El password debe contener un mínimo de 8 caracteres.',
	NUMBERS_PASSWORD: 'El password debe contener por lo mínimo un número.',
	BLANK_ADDRESS: 'La dirección no puede estar en blanco.',
	AGE_BLANK: 'Debes especificar tu edad.',
	AGE_MIN: 'Para operar en este sitio debes ser mayor de 18 años.',
	AGE_MAX: '¡Ja! No te creo que tengas mas de 100 años.',
	BLANK_PHONE: 'El teléfono no puede estar en blanco.',
	AVATAR_BLANK: 'Debes cargar un archivo con tu avatar o fotografia.',
	AVATAR_TYPE: 'El formato de la imagen debe ser ".JPG".',
	SIGNINGUP: 'Registrando su usuario...',
	SINGUP_PASS: 'Se ha creado su usuario.\nUtilice los datos suministrados para iniciar sesión.',
	SINGUP_FAIL: 'Ocurrio un error al crear el usuario.\nContacte al administrador si el problema continua.'
}

const setError = (message) => {
	errorMsgsContainer.innerText += `${message}\n`;
}

const setInfo = (message) => {
	infoMsgsContainer.innerText = message;
}

const validateInputs = (inputsData) => {
	let errorCounter = 0;

	errorMsgsContainer.innerText = '';
	infoMsgsContainer.innerText = '';

	if( inputsData.name.length < 1 ) { errorCounter++; setError(stdMessages.BLANK_NAME); }
	if( inputsData.mail.length < 1 ) { errorCounter++; setError(stdMessages.BLANK_EMAIL); }
	if( inputsData.mail.includes('@') === false ) { errorCounter++; setError(stdMessages.INVALID_EMAIL_AT); }
	if( inputsData.mail.includes('.com') === false ) { errorCounter++; setError(stdMessages.INVALID_EMAIL_COM); }
	if( inputsData.password.length < 1 ) { errorCounter++; setError(stdMessages.BLANK_PASSWORD); }
	if( inputsData.password.length < 8 ) { errorCounter++; setError(stdMessages.SHORT_PASSWORD); }
	if( inputsData.address.length < 1 ) { errorCounter++; setError(stdMessages.BLANK_ADDRESS); }
	if( inputsData.age.length < 1 ) { errorCounter++; setError(stdMessages.AGE_BLANK); }
	if( inputsData.age < 18 ) { errorCounter++; setError(stdMessages.AGE_MIN); }
	if( inputsData.age >= 100 ) { errorCounter++; setError(stdMessages.AGE_MAX); }
	if( inputsData.phone.length < 1 ) { errorCounter++; setError(stdMessages.BLANK_PHONE); }
	if( inputsData.avatar.name.length < 1 ) { errorCounter++; setError(stdMessages.AVATAR_BLANK); }
	if( inputsData.avatar.type !== 'image/jpeg' ) { errorCounter++; setError(stdMessages.AVATAR_TYPE); }

	if( errorCounter === 0 ) return true
	else return false
}

const validateCreation = (inputsData, creationData) => {
	let errorCounter = 0

	if( inputsData.name !== creationData.name ) errorCounter++
	if( inputsData.mail !== creationData.mail ) errorCounter++
	if( Number(inputsData.age) !== creationData.age ) errorCounter++
	if( inputsData.phone !== creationData.phone ) errorCounter++

	if( errorCounter === 0 ) return true
	else return false
}

signUpForm.addEventListener('submit', (e) =>{
	e.preventDefault()

	const formData = new FormData(e.target);
	const inputsData = Object.fromEntries(formData);
	
	if( validateInputs(inputsData) ) {
		setInfo(stdMessages.SIGNINGUP);

		const fetchURI = '/api/auth/signup';

		const fetchConfig = {
			method: 'post',
			body: formData
		}

		fetch(fetchURI, fetchConfig)
			.then( data => data.json() )
			.then( data => {
				if( validateCreation(inputsData, data) ) {
					signUpForm.reset();
					setInfo(stdMessages.SINGUP_PASS);
					setTimeout( () => document.location.replace('/app/login'), 3000 );
				}
				else {
					setInfo('');
					setError(`${stdMessages.SINGUP_FAIL} \n ${data.message}`); console.log(data);
				}
			})
			.catch( error => setError( error ) )
	}

})