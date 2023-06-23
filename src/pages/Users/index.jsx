import React, { useContext, useEffect, useState } from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Select,
  MenuItem,
} from '@mui/material'
import { Visibility, VisibilityOff,Refresh } from '@material-ui/icons'
import config from '../../config'
import axios from 'axios'
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min'
import CryptoJS from 'crypto-js'
export default function Users() {
  const [showPassword, setShowPassword] = useState(false)
  const [sites, setSites] = useState([])
  const [user, setUser] = useState({
    id: '',
    nom: '',
    prenom: '',
    site: '',
    role: '',
    login: '',
    password: '',
    etat: 'actif',
  })
  const history = useHistory()
  const [token,setToken] = useState(localStorage.getItem('token'))
  const [role,setRole] =  useState(localStorage.getItem('role'))
  const [decryptedRole, setDecryptedRole] = useState('')

  //Recuperation de tous les users existants
  
  const { id } = useParams()
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value })
  }
  const loadSites = async () => {
    try {
      //Recuperation des données  correspondant aux sites en utilisant l'api
      const resultat = await axios.get (`${config.API_URL}/trainSites`)
      //modification des sites
      setSites(resultat.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
   loadSites()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (id) {
      //
      try {
        await axios.put(`${config.API_URL}/updateuser/${id}`, user)
        alert('La modification a été prise en compte!')
        history.push('/administration')
      } catch (error) {}
      //
    } else {
      //
      try {
        await axios.post(`${config.API_URL}/NewUser`, user)
        alert('Utilisateur ajouté')
        history.push('/administration')
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("L'utilisateur existe déjà")
        } else if (error.response && error.response.status === 404) {
          alert('La ressource que vous demandez est inconnu')
        } else {
          alert('erreur')
        }
      }
      //
    }
  }
  
  function generatePassword(length) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
  const handleGeneratePassword = () => {
    setUser({ ...user, password: generatePassword(20) });
  }

  const loadUser = async () => {
    try {
      if (id) {
        const response = await axios.get(`${config.API_URL}/user/${id}`)
        setUser(response.data) // <- mise à jour des données de l'utilisateur
      }
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }
  const decrypt = () => {
    
    if (role && token) {
      const secretKey = CryptoJS.enc.Utf8.parse(config.secret)
      const encryptedRoleText = CryptoJS.enc.Base64.parse(role)
      
      const decryptedRoleText = CryptoJS.AES.decrypt(
        { ciphertext: encryptedRoleText },
        secretKey,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      )

      // Convertir le texte déchiffré en chaîne de caractères
      const decryptedRole = decryptedRoleText.toString(CryptoJS.enc.Utf8)
      setDecryptedRole(decryptedRole)
      if (! (decryptedRole.includes('admin')) ) {
        history.push('/jourJ')
        alert('la')
      }
     
    } else {
      console.log('Les variables role et prenom ne sont pas définies')
    }
  }
  useEffect(() => {
    loadUser()
  }, [])
  useEffect(() => {
    decrypt()
  }, [role, token])


  return (
    <div className="parent administration">
      <form className="authentification" onSubmit={handleSubmit}>
        <h1>Administration</h1>
        <FormControl variant="outlined" className='champs'>
          <TextField
            label="Nom"
            value={user.nom}
            onChange={handleChange('nom')}
            required
            disabled={id}
          />
        </FormControl>
        <FormControl variant="outlined" className='champs'>
          <TextField
            label="Prénom"
            value={user.prenom}
            onChange={handleChange('prenom')}
            required
            disabled={id}
          />
        </FormControl>
        <FormControl variant="outlined" className="select-ajout">
          <InputLabel id="site-label">Site</InputLabel>
          <Select
            label="Site"
            value={user.site}
            onChange={handleChange('site')}
            required
            labelId="site-label"
          >
           {sites.map((site,index)=>(
            <MenuItem value={site}>{site}</MenuItem>
           ))}
            
           
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="select-ajout">
          <InputLabel id="role-label">Rôle</InputLabel>
          <Select
            label="role"
            value={user.role}
            onChange={handleChange('role')}
            required
            labelId="role-label"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="select-ajout">
          <InputLabel id="role-label">Statut</InputLabel>
          <Select
            label="statut"
            value={user.etat}
            onChange={handleChange('etat')}
            required
            labelId="role-label"
          >
            <MenuItem value="actif">Actif</MenuItem>
            <MenuItem value="inactif">Inactif</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className='champs'>
          <TextField
            type="email"
            label="Email"
            value={user.login}
            onChange={handleChange('login')}
            required
            disabled = {id}
          />
        </FormControl>
        <FormControl variant="outlined" className="select-ajout">
          <InputLabel htmlFor="outlined-adornment-password">
            Mot de passe
          </InputLabel>
          <OutlinedInput
            label="mot de passe"
            labelId="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange('password')}
            value={user.password}
            endAdornment={
              <>
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
              <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleGeneratePassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                <Refresh/>
              </IconButton>
            </InputAdornment>
            </>
            }
            labelWidth={70}
          />
           </FormControl>
          {id && (
          <FormControl variant="outlined" className="select-ajout">
            <InputLabel htmlFor="outlined-adornment-passwordconf">
            Confirmer mot de passe
          </InputLabel>
            <OutlinedInput
            label="Confirmation de mot de passe"
            labelId="outlined-adornment-passwordconf"
            type={showPassword ? 'text' : 'password'}
            value={user.password}
           
            onChange={handleChange('password')}
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
          </FormControl>)}
          
       
        {id ? (
          <button className="submit" type="submit">
            Modifier
          </button>
        ) : (
          <button className="submit" type="submit">
            Ajouter
          </button>
        )}
      </form>
    </div>
  )
}
