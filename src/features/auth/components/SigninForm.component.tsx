import { FC, FormEvent } from 'react'
import { Box, Grid, TextField, InputLabel, Typography, Button, Divider } from "@mui/material";
import {Link} from "react-router-dom";
import useInput from "../../../hooks/input/use-inputs";
import {validateEmail} from "../../../shared/utils/validation/email";
import {validatePasswordLength} from "../../../shared/utils/validation/length";

const SigninFormComponent: FC = () => {

  /* ========== Fields Validation ============ */

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

  /* =================================================== */

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailHasError || passwordHasError) return;
    if (email.length === 0 || password.length === 0) return;

    console.log('USER', email, password)

    clearForm()
  }

  return (
    <>
      <Box sx={{ border: 1, padding: 2, borderColor: '#cccccc', width: '350px', marginTop: 2 }}>
        <form onSubmit={onSubmitHandler}>
          <Grid container direction='column' justifyContent='flex-start'>

            <Typography variant='h4' component='h1'>S'identifier</Typography>

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

            <Button
              variant='contained'
              style={{
                marginTop: '16px', height: '31px', backgroundColor: '#f0c14b', color: 'black',
                borderColor: '#a88734 #9c7e31 #846a29', textTransform: 'none'
              }}
              type='submit'
            >
              Se connecter
            </Button>

          </Grid>
        </form>

        <div style={{ marginTop: '30px' }}>
          <small>
            En passant votre commande, vous acceptez les
            <a href="#" style={{ textDecoration: 'none' }}>{' '}Conditions générales de vente{' '}</a> d’Amazon. Veuillez consulter notre
            <a href="#" style={{ textDecoration: 'none' }}>{' '}Notice Protection de vos Informations Personnelles</a>, notre
            <a href="#" style={{ textDecoration: 'none' }}>{' '}Notice Cookies{' '}</a>et notre
            <a href="#" style={{ textDecoration: 'none' }}>{' '}Notice Annonces publicitaires basées sur vos centres d’intérêt</a>.
          </small>
        </div>
      </Box>

      <div style={{ marginTop: '16px' }}>
        <Divider>
          <small style={{ color: '#767676' }}>Nouveau chez Amazon ?</small>
        </Divider>

        <Link to='/register' style={{ textDecoration: 'none', color: '#0000ee' }}>
          <Button
            variant='contained'
            style={{ width: '100%', marginTop: '12px', height: '31px', backgroundColor: '#f1f1f1', color: 'black', textTransform: 'none' }}
          >
            Créer votre compte Amazon
          </Button>
        </Link>

      </div>
    </>
  )
}

export default SigninFormComponent
