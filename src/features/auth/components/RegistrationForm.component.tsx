import {FC, FormEvent, useEffect} from 'react'
import {Box, Grid, TextField, InputLabel, Typography, Button, Divider, CircularProgress} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

import useInput from "../../../hooks/input/use-inputs";
import {validateNameLength, validatePasswordLength} from "../../../shared/utils/validation/length";
import {validateEmail} from "../../../shared/utils/validation/email";
import {NewUser} from "../models/NewUser";

// Redux
import {useAppDispatch, useAppSelector} from "../../../hooks/redux/hook";
import {register, reset} from "../authSlice";

const RegistrationFormComponent: FC = () => {

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess } = useAppSelector( (state) => state.auth);

  const navigate = useNavigate();

  /* ========== Fields Validation ============ */
  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength)

  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail)

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength)

  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength)

  /* =================================================== */

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) return;
    if (nameHasError || emailHasError || passwordHasError || confirmPasswordHasError) return;
    if (name.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) return;

    const newUser: NewUser = { name, email, password }

    dispatch(register(newUser))
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
      clearForm()
      navigate('/signin')
    }
  }, [isSuccess, dispatch])

  if (isLoading) return <CircularProgress sx={{ marginTop: '64px' }} color="primary" />

  return (
   <Box sx={{ border: 1, padding: 2, borderColor: '#cccccc', width: '350px', marginTop: 2 }}>
    <form onSubmit={onSubmitHandler}>
      <Grid container direction='column' justifyContent='flex-start'>

        <Typography variant='h4' component='h1'>Créer un compte</Typography>

        <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor='name'>Votre nom</InputLabel>

        <TextField
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          error={nameHasError}
          helperText={nameHasError ? 'Saisir votre nom' : ''}
          type='text'
          name='name'
          id='name'
          variant='outlined'
          size='small'
          placeholder='Prénom Nom'
        />

        <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor='email'>Adresse e-mail</InputLabel>

        <TextField
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          error={emailHasError}
          helperText={emailHasError ? 'Saisir votre email' : ''}
          type='email'
          name='email'
          id='email'
          variant='outlined'
          size='small'
        />

        <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor='password'>Mot de passe</InputLabel>

        <TextField
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          error={passwordHasError}
          helperText={passwordHasError ? '6 caractères minimum requis' : ''}
          type='password'
          name='password'
          id='password'
          variant='outlined'
          size='small'
          placeholder='Au moins 6 caractères' />

        <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor='confirmPassword'>Entrer le mot de passe à nouveau</InputLabel>

        <TextField
          value={confirmPassword}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          error={confirmPassword.length > 0 && password !== confirmPassword}
          helperText={confirmPassword.length > 0 && password !== confirmPassword ? 'les mots de passe ne sont pas identique' : ''}
          type='password'
          name='confirmPassword'
          id='confirmPassword'
          variant='outlined'
          size='small' />

        <Button
          id='register-btn'
          variant='contained'
          style={{
            marginTop: '16px', height: '31px', backgroundColor: '#f0c14b', color: 'black',
            borderColor: '#a88734 #9c7e31 #846a29', textTransform: 'none'
          }}
          type='submit'
        >
          Continuer
        </Button>

      </Grid>
    </form>

    <div style={{ marginTop: '30px' }}>
      <small>
        En créant un compte, vous acceptez les
        <a href="/" style={{ textDecoration: 'none' }}>{' '}Conditions générales de vente{' '}</a> d’Amazon. Veuillez consulter notre
        <a href="/" style={{ textDecoration: 'none' }}>{' '}Notice Protection de vos Informations Personnelles</a>, notre
        <a href="/" style={{ textDecoration: 'none' }}>{' '}Notice Cookies{' '}</a>et notre
        <a href="/" style={{ textDecoration: 'none' }}>{' '}Notice Annonces publicitaires basées sur vos centres d’intérêt</a>.
      </small>
    </div>

     <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />

     <div>
       <small>
         Vous possédez déjà un compte ?{' '}
         <Link to='/signin' style={{ textDecoration: 'none', color: '#0000ee' }}>Identifiez-vous</Link>
       </small>
     </div>

     <div>
       <small>
         Vous achetez pour votre entreprise?
         <a href="/" style={{ textDecoration: 'none' }}>{' '}Créez un compte professionnel gratuit</a>
       </small>
     </div>



   </Box>
  )
}

export default RegistrationFormComponent
