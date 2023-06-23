import { useState } from 'react'
import { MenuItem, Select } from '@mui/material'


export default function Resultats({ options, onChange, disabled }) {
  const [myValue, setMyValue] = useState()

  const handleResultChange = (value) => {
    
    setMyValue(value)
    onChange(value)
  }
  console.log(disabled)

  return (
   
      <Select
        onChange={(e) => handleResultChange(e.target.value)}
        defaultValue={myValue}
        value={myValue}
        disabled={disabled} // désactiver l'option "Uniquement 50592" si "Uniquement SAM" est sélectionné
      >
        {options.map((option, id) => (
          <MenuItem key={id} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
   
  )
}