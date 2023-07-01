import { useState } from 'react'
import { MenuItem, Select } from '@mui/material'


export default function Resultats({ options, onChange, disabled,compStyle }) {
  const [myValue, setMyValue] = useState()

  const handleResultChange = (value) => {
    
    setMyValue(value)
    onChange(value)
  }
  console.log(disabled)

  return (
   
    <Select
    style={{
      width: '130px',
      padding: '0px',
      height: '32px',
      borderColor: 'none',
      backgroundColor:'white',
      marginTop:'3px'
    }}
    onChange={(e) => handleResultChange(e.target.value)}
    defaultValue={myValue}
    value={myValue}
    disabled={disabled} 
  >
        {options.map((option, id) => (
          <MenuItem key={id} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
   
  )
}