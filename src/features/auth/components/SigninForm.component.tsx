import { FC, FormEvent } from 'react'
import { Box, Grid, TextField, InputLabel, Typography, Button, Divider } from "@mui/material";
import {Link} from "react-router-dom";

const SigninFormComponent: FC = () => {

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Clicked!')
  }

  return (
    <>
      <Box sx={{ border: 1, padding: 2, borderColor: '#cccccc', width: '350px', marginTop: 2 }}>
        <form onSubmit={onSubmitHandler}>
          <Grid container direction='column' justifyContent='flex-start'>

            <Typography variant='h4' component='h1'>S'identifier</Typography>

            <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor='email'>Adresse e-mail</InputLabel>
            <TextField type='text' name='email' id='email' variant='outlined' size='small' />

            <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor='password'>Mot de passe</InputLabel>
            <TextField type='text' name='password' id='password' variant='outlined' size='small' />

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
