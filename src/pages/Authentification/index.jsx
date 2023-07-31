import React, { useContext, useEffect, useState } from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import config from '../../config'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { Link, useHistory} from 'react-router-dom'
import AuthContext from './AuthContext'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const token = localStorage.getItem('token')
  const [values, setValues] = useState({
    login: '',
    password: '',
  })
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [decryptedRole, setDecryptedRole] = useState('')
  const [decryptedPrenom, setDecryptedPrenom] = useState('')
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData();
      formData.append("login", values.login)
      formData.append("password", values.password)
      const timestamp = Date.now(); // Ajout du timestamp
      const response = await axios.post(`${config.API_URL}/connexion?timestamp=${timestamp}`, formData) // Utilisation du timestamp dans l'URL
      const token = response.data.a
      const role = response.data.c
      const prenom = response.data.b
      auth.setAuth({ token, role, prenom })
      localStorage.setItem('role', role)
      localStorage.setItem('token', token)
      localStorage.setItem('prenom', prenom)
      alert('Connexion réussie')
      history.push('/jourJ')
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('La ressource que vous demandez est inconnue')
      } else if (error.response && error.response.status === 401) {
        alert(error.response.data)
      } else {
        alert('Erreur')
      }
    }
  }
  /*useEffect(() => {
    if(token){
      history.push('/jourJ')
    }
  }, [])*/

  return (
    <div className="parent home" style={{ display: 'block' }}>
      
        <form className="authentification" onSubmit={handleSubmit}>
          <h1>Connexion</h1>
          <FormControl variant="outlined" className='champs'>
            <TextField
              label="Email"
              value={values.login}
              onChange={handleChange('login')}
            />
          </FormControl>
          <FormControl variant="outlined" className='champs'>
            <InputLabel htmlFor="outlined-adornment-password">
              Mot de passe
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              label="mot de passe"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <button className="submit" type="submit">
            Connexion
          </button>
        </form>
      
    </div>
  )
}

export default LoginForm
