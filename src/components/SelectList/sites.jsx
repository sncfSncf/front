import '../../styles/styles.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../config'
export default function Site({ onChange }) {
  const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(-1) // initialize to -1, which means no checkbox is selected
  const [sites, setSites] = useState([])

  const handleCheckboxChange = (isChecked, index) => {
    if (isChecked) {
      console.log(index)
      setSelectedCheckboxIndex(index) // set the index of the selected checkbox
      onChange(sites[index]) // passer la valeur sélectionnée à la fonction onChange
    } else {
      setSelectedCheckboxIndex(-1) // if the checkbox is unchecked, clear the selection
    }
  }

  //Recuperation de tous les sites existants
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

  return (
    <div className="filtres-gen site">
      <div className="card-header">
        Sites
      </div>
      <div className="sites">
        {sites.map((site, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={selectedCheckboxIndex === index} 
              onChange={(e) => handleCheckboxChange(e.target.checked, index)}
              name= {site}
              id={site}
            />

            <label for={site}>{site}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
