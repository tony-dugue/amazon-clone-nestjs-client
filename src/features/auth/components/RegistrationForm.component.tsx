import { FC, FormEvent } from 'react'
import { Box, Grid, TextField, InputLabel, Typography, Button, Divider } from "@mui/material";
import {Link} from "react-router-dom";

const RegistrationFormComponent: FC = () => {

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Clicked!')
  }

  return (
   <Box sx={{ border: 1, padding: 2, borderColor: '#cccccc', width: '350px', marginTop: 2 }}>
    <form onSubmit={onSubmitHandler}>
      <Grid container direction='column' justifyContent='flex-start'>

        <Typography variant='h4' component='h1'>Créer un compte</Typography>

        <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor='name'>Votre nom</InputLabel>
        <TextField type='text' name='name' id='name' variant='outlined' size='small' placeholder='Prénom Nom'/>

        <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor='email'>Adresse e-mail</InputLabel>
        <TextField type='text' name='email' id='email' variant='outlined' size='small' />

        <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor='password'>Mot de passe</InputLabel>
        <TextField type='text' name='password' id='password' variant='outlined' size='small' placeholder='Au moins 6 caractères' />

        <InputLabel sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }} htmlFor='confirmPassword'>Entrer le mot de passe à nouveau</InputLabel>
        <TextField type='text' name='confirmPassword' id='confirmPassword' variant='outlined' size='small' />

        <Button
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
        <a href="#" style={{ textDecoration: 'none' }}>{' '}Conditions générales de vente{' '}</a> d’Amazon. Veuillez consulter notre
        <a href="#" style={{ textDecoration: 'none' }}>{' '}Notice Protection de vos Informations Personnelles</a>, notre
        <a href="#" style={{ textDecoration: 'none' }}>{' '}Notice Cookies{' '}</a>et notre
        <a href="#" style={{ textDecoration: 'none' }}>{' '}Notice Annonces publicitaires basées sur vos centres d’intérêt</a>.
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
         <a href="#" style={{ textDecoration: 'none' }}>{' '}Créez un compte professionnel gratuit</a>
       </small>
     </div>



   </Box>
  )
}

export default RegistrationFormComponent
