import { useState, useEffect, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import logo from '../../exemples/images/logoSNCF.png'
import '../../styles/styles.css'
import config from '../../config'
import AuthContext from '../../pages/Authentification/AuthContext'
function Header() {

  const auth = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [role, setRole] = useState(localStorage.getItem('role'))
  const [prenom, setPrenom] = useState(localStorage.getItem('prenom'))
  const [decryptedRole, setDecryptedRole] = useState('')
  const [decryptedPrenom, setDecryptedPrenom] = useState('')
  const history = useHistory()

  const handleLogout = () => {
    localStorage.clear()
    auth.setAuth({token: null, role: null, prenom: null})
    history.push('/')
  }


  const fetchAndDecryptUserData = () => {

    if (role && prenom) {
      const secretKey = CryptoJS.enc.Utf8.parse(config.secret)
      const encryptedRoleText = CryptoJS.enc.Base64.parse(role)
      const encryptedPrenomText = CryptoJS.enc.Base64.parse(prenom)
      const decryptedRoleText = CryptoJS.AES.decrypt(
        { ciphertext: encryptedRoleText },
        secretKey,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      )
      const decryptedRole = decryptedRoleText.toString(CryptoJS.enc.Utf8)

      
      const decryptedPrenomText = CryptoJS.AES.decrypt(
        { ciphertext: encryptedPrenomText },
        secretKey,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      )
      const decryptedPrenom = decryptedPrenomText.toString(CryptoJS.enc.Utf8)

      
      setDecryptedRole(decryptedRole)
      setDecryptedPrenom(decryptedPrenom)
    } else {
     
    }
  }

  useEffect(() => {
    setIsLoading(false)
    fetchAndDecryptUserData()
  }, [])

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    setRole(localStorage.getItem('role'))
    setPrenom(localStorage.getItem('prenom'))
  }, [auth])

  useEffect(() => {
    fetchAndDecryptUserData()
  }, [role, prenom])

  useEffect(() => {
    if (!token) {
      history.push('/')
    }
  }, [token, history])

  if (isLoading) {
    return null
  }

  return (
    <AppBar
      className="header"
      position="fixed"
      style={{ paddingRight: '0 !important' }}
    >
      <Toolbar
        sx={{
          backgroundColor: 'var(--sncf-noir-bg)',
          
        }}
      >
        <Box sx={{ marginRight: 'auto' }}>
          
            <Tab
              style={{
                backgroundImage:`url(${logo})`,
                backgroundSize:'cover',
                padding:'0px',
                height:'64px'
              }}
            
            />
          <Tab
            label="BASE ESSAIS SAM S005 & 50592 "
            style={{
              color: 'white',
              fontSize: '18px',
            }}
          />
          {token && (
            <Tab
              icon={<PersonIcon />}
              label={decryptedPrenom}
              style={{
                textDecoration: 'none',
                position: 'absolute',
                right: 130,
                top: 0,
              }}
            />
          )}
          {token ? (
            <Tab
              icon={<LogoutIcon />}
              label="Déconnexion"
              style={{
                textDecoration: 'none',
                position: 'absolute',
                right: 0,
                top: 0,
              }}
              onClick={handleLogout}
            />
          ) : (
            <NavLink
              activeClassName="nonactive"
              to="/"
              style={{
                textDecoration: 'none',
                position: 'absolute',
                right: 0,
                top: 0,
              }}
            >
              <Tab
                icon={<LoginIcon />}
                label="Connexion"
                sx={{ color: 'white' }}
              />
            </NavLink>
          )}
        </Box>
      </Toolbar>
      {token && (
        <Toolbar
          style={{ padding: '0' }}
          className="bleu-active"
          sx={{ backgroundColor: 'white' }}
        >
          <Tabs style={{ position: 'relative' }}>
          
            <NavLink
              activeClassName="active"
              to="/jourJ"
              exact
              style={{ textDecoration: 'none' }}
            >
              <Tab label="Temps réel" sx={{ color: 'black' }} />
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/historique"
              style={{ textDecoration: 'none' }}
            >
              <Tab label="Historique" sx={{ color: 'black' }} />
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/journal"
              style={{ textDecoration: 'none' }}
            >
              <Tab label="Journal & Statistiques" sx={{ color: 'black' }} />
            </NavLink>

            

            <NavLink
              activeClassName="active"
              to="/synoptique"
              style={{ textDecoration: 'none' }}
            >
              <Tab label="Synoptique" sx={{ color: 'black' }} />
             
            </NavLink>
           
            {decryptedRole === 'admin' && (
              <NavLink
                activeClassName="active"
                to="/administration"
                style={{ textDecoration: 'none' }}
              >
                <Tab label="Administration" sx={{ color: 'black' }} />
              </NavLink>
            )}
             <NavLink
              activeClassName="active"
              to="/aide"
              exact
              style={{ textDecoration: 'none' }}
            >
              <Tab label="Aide" sx={{ color: 'black' }} />
            </NavLink>
          </Tabs>
        </Toolbar>
      )}
    </AppBar>
  )
}

export default Header
