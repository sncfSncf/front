import React, { useContext, useEffect, useState } from 'react'
import config from '../../config'
import axios from 'axios'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CryptoJS from 'crypto-js'
 
export default function Administration() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null) // new state variable
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const history = useHistory()
  const [decryptedRole, setDecryptedRole] = useState('')
  console.log('tok '+token+' role '+role)
  //Recuperation de tous les users existants
  
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
      }
     
    } else {
      console.log('Les variables role et prenom ne sont pas définies')
    }
  }
  const loadUsers = async () => {
    try {
      const resultat = await axios.get(`${config.API_URLV2}/user`)
      setUsers(resultat.data)
    } catch (error) {
      console.error(error)

      alert(error)
    }
  }
  console.log(users)
  const handleModifierClick = (id) => {
    setSelectedUser(id)
    history.push(`/NewUser/${id}`)
  }
  //
  const handleSuppressionClick = async(id) => {
    try {
      const shouldDelete = window.confirm('Etes-vous sûr de vouloir supprimer cet utilisateur?');
  
      if (shouldDelete) {
        const formData = new FormData();
        formData.append("id", id)
        await axios.post(`${config.API_URLV2}/user/delete`, formData);
        history.push('/administration')
        loadUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAjouterClick = () => {
    history.push('/NewUser');
  };
  useEffect(() => {
    loadUsers()
  }, [])
  useEffect(() => {
    decrypt()
  }, [role, token])

  return (
    <div className="parent administration">
      <button  className="btn-actions" style={{backgroundColor:'var(--sncf-bleu-primaire-bg)',float:'right',margin:'20px 0px'}} onClick={handleAjouterClick}>Ajouter</button>
      <Table style={{marginBottom:'100px'}}>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Rôle</TableCell>
            <TableCell>Actif</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell key={user.nom}>{user.nom}</TableCell>
              <TableCell key={user.prenom}>{user.prenom}</TableCell>
              <TableCell key={user.role}>{user.role}</TableCell>
              <TableCell key={user.etat}>
                {user.etat === 'inactif' ? (
                  <span className="inactif">{user.etat}</span>
                ) : (
                  <span className="actif">{user.etat}</span>
                )}
              </TableCell>
              <TableCell key={user.login}>{user.login}</TableCell>
              <TableCell>
                <button
                  className="btn-actions mod"
                  onClick={() => handleModifierClick(user.id)}
                >
                  Modifier
                </button>
                <button
                  className="btn-actions sup"
                  onClick={() => handleSuppressionClick(user.id)}
                >
                  Supprimer
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
