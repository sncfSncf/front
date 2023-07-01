import * as React from 'react'
import IconButton from '@mui/material/IconButton'

import temp from '../../exemples/images/TNN.png'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import ReactPaginate from 'react-paginate';
import TableRow from '@mui/material/TableRow'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Link } from 'react-router-dom'
import { useState, useEffect,useImperativeHandle,useRef } from 'react'
import TableResultat from '../traitements/traitementCouleur'
import NF50592 from '../../pages/50592'
import Resultats from '../../components/SelectList/resultats'
// CollapsibleTable
  
  const CollapsibleTable = React.forwardRef(({trains}, ref) => {


    useImperativeHandle(ref, () => ({
      childMethod() {
        refreshTrains()
      }
    }))

    
  const [trainsFiltres, setTrainsFiltres] = useState(trains);
  const [open, setOpen] = useState({});
  const option50592 = ['NOK', 'OK', 'uniquement 50592']
  const optionSAM = ['NOK', 'OK', 'uniquement SAM']
  const [refreshKey, setRefreshKey] = useState(0);


  const [inputValues, setInputValues] = useState({
    searchDate:'',
    searchNumero: '',
    searchIdentification: '',
    searchVitesse: '',
    searchSam: '',
    search50592: '',
    searchSyrenne: ''
    
  });
  const options = ['Ok', 'NOK']
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 50;

  

  const refreshTrains=()=>{
    console.log("refreshcalled");
    setRefreshKey((prevKey) => prevKey + 1);
    setInputValues({
      searchDate:'',
      searchNumero: '',
      searchIdentification: '',
      searchVitesse: '',
      searchSam: '',
      search50592: '',
      searchSyrenne: ''
      
    });
  }

  const handleSearchChange = (event) => {
    const { name, value } = event.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  
 



  const handleSearchSamChange = (value) => {

    setInputValues((prevValues) => ({
      ...prevValues,
      searchSam: value,
    }));
  };
  const handleSearch50592Change = (value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      search50592: value,
    }));
  };


  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };


  // Filtrer l'ancien tableau quand l'utilisateur saisit dans l'input
  useEffect(() => {
    const filteredTrains = trains.filter((train) => {
      if (
        inputValues.searchDate &&
        !train.datesam?.includes(inputValues.searchDate.toUpperCase())
      ) {
        return false;
      }
      if (
        inputValues.searchNumero &&
        !train.numTrain?.includes(inputValues.searchNumero.toUpperCase())
      ) {
        return false;
      }
      if (
        inputValues.searchIdentification &&
        !train.mr?.includes(inputValues.searchIdentification.toUpperCase())
      ) {
        return false;
      }
      if (
        inputValues.searchVitesse &&
        !String(train.vitesse_moy).includes(inputValues.searchVitesse)
      ) {
        return false;
      }
      if (
        inputValues.searchSam &&
        train.statutSAM !== inputValues.searchSam.toUpperCase()
      ) {
        return false;
      }
      if (
        inputValues.search50592 &&
        train.statut50592 !== inputValues.search50592.toUpperCase()
      ) {
        return false;
      }
      return true; //pas de filtre appliquée
    });

    const indexOfLastTrain = (currentPage + 1) * itemsPerPage;
    const indexOfFirstTrain = indexOfLastTrain - itemsPerPage;
    const currentTrains = filteredTrains.slice(
      indexOfFirstTrain,
      indexOfLastTrain
    );

    setTrainsFiltres(currentTrains);
  }, [trains, inputValues, currentPage]);
  const pageCount = Math.ceil(trains.length / itemsPerPage);
  const pageRangeDisplayed = 5;

  // fonction pour changer l'état de chaque ligne
 

  // Helper function to get the timestamp from a train object
  const getTimestamp = (train) => {
    if (train.dateFichier !== null && train.dateFichier !== undefined) {
      return new Date(`${train.dateFichier} ${train.heureFichier}`).getTime();
    } else if (train.datesam !== null && train.datesam !== undefined) {
      return new Date(`${train.datesam} ${train.heuresam}`).getTime();
    } else {
      return new Date(`${train.date50592} ${train.heure50592}`).getTime();
    }
  };
  const handleRowClick = (index) => {
    setOpen({ ...open, [index]: !open[index] });
  };
  trains.sort((a, b) => {
  
  
    const timestampA = getTimestamp(a);
    const timestampB = getTimestamp(b);
    return timestampB - timestampA;
  });
  const [isHovered, setIsHovered] = useState(false);
  if (trains.length > 0) {
    const linkStyle = {
      color: 'black',
      textDecoration: 'none',
      transition: 'color 0.3s',
    };
    
    const linkHoverStyle = {
      color: 'blue',
    };
   
    return (
      <><div style={{ width: '100%', overflowX: 'auto' }}>
         <Table style={{ width: '100%' }} className="trainTab" aria-label="collapsible table">
         <TableHead style={{ width: '100%' }}>
  <TableRow>
    <TableCell style={{ width: '5px' }} />

    <TableCell align="center" style={{ verticalAlign: 'top' }}>
      <div style={{  fontWeight: 'bold' }}>Horodatage</div>
      <div>
        <input
          type="text"
          value={inputValues.searchDate}
          name="searchDate"
          onChange={handleSearchChange}
          placeholder=" "
          style={{ width: '70%',height:'30px',border:'none',marginTop:'5px' }}
        />
      </div>
    </TableCell>

    <TableCell align="center" style={{ verticalAlign: 'top'}}>
      <div style={{  fontWeight: 'bold' , whiteSpace: 'nowrap' }}>N° train</div>
      <div>
        <input
          
          type="text"
          value={inputValues.searchNumero}
          name="searchNumero"
          onChange={handleSearchChange}
          placeholder=" "
          style={{ width: '100%',height:'30px',border:'none',marginTop:'5px' }}
        />
      </div>
    </TableCell>

    <TableCell  align="center" style={{ verticalAlign: 'top',whiteSpace: 'nowrap'}}>
      <div style={{  fontWeight: 'bold' }}>identification MR</div>
      <div>
        <input
          
          type="text"
          value={inputValues.searchIdentification}
          name="searchIdentification"
          onChange={handleSearchChange}
          placeholder=" "
          style={{ width: '100%',height:'30px',border:'none',marginTop:'5px' }}
        />
      </div>
    </TableCell>

    <TableCell  align="center" style={{ verticalAlign: 'top',whiteSpace: 'nowrap'}}>
      <div style={{  fontWeight: 'bold' }}>Vitesse moyenne</div>
      <div>
        <input
          
          type="text"
          name="searchVitesse"
          value={inputValues.searchVitesse}
          onChange={handleSearchChange}
          placeholder=" "
          style={{ width: '100%',height:'30px',border:'none',marginTop:'5px' }}
        />
      </div>
    </TableCell>

    <TableCell align="center" style={{ verticalAlign: 'top'}}>
      <div style={{  fontWeight: 'bold' }}> SAMS005 50592</div>
     
      <div style={{ display: 'flex'}}>
        {/* <input
          className=" methodes"
          type="text"
          name="searchSam"
          value={inputValues.searchSam}
          onChange={handleSearchChange}
          placeholder="SAM"
          style={{ width: '50%',height:'30px',border:'none',marginTop:'5px',marginRight:'10px',paddingLeft:'5px'}}
        /> */}
    <Resultats
  key={`searchSam_${refreshKey}`}
  name="searchSam"
  onChange={handleSearchSamChange}
  options={option50592}
  compStyle={{ height: '2em', backgroundColor: 'white', border: 'none', marginTop: '5px', width: '70%' }}
  value={inputValues.searchSam}
  style={{ height: '30px', marginRight: '10px', paddingLeft: '5px' }}
/>

<Resultats
  key={`search50592_${refreshKey}`}
  name="search50592"
  onChange={handleSearch50592Change}
  options={optionSAM}
  compStyle={{ height: '2em', backgroundColor: 'white', border: 'none', marginTop: '5px', width: '70%' }}
  value={inputValues.search50592}
  style={{  height: '30px', border: 'none', marginTop: '5px', marginRight: '10px', paddingLeft: '5px', backgroundColor: 'white' }}
/>

      </div>
    </TableCell>

    <TableCell style={{ verticalAlign: 'top'}}>
      <div style={{  fontWeight: 'bold' }}> SYRENE</div>
    </TableCell>

    <TableCell style={{ verticalAlign: 'top' }}>
  <div style={{ fontWeight: 'bold' }}>
    <img src={temp} alt="Température / Humidité / courant dans le rail" style={{ height: '65px', width: '100px',marginTop:'-2px' }} />
  </div>
</TableCell>
  </TableRow>
</TableHead>


        <TableBody>
          {trainsFiltres?.map((train, index) => (
            <React.Fragment key={index}>
              <TableRow key={index}>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleRowClick(index)}
                  >
                    {open[index] ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell align="center" style={{ width: '100px', whiteSpace: 'nowrap' }}>
  { (train.dateFichier !== null && train.dateFichier !== undefined)
    ? train.dateFichier + '-' + train.heureFichier
    : (train.datesam !== null && train.datesam !== undefined) 
    ? train.datesam + '-' + train.heuresam
    : train.date50592 + '-' + train.heure50592
  }
</TableCell>


                <TableCell align="center">{train.numTrain}</TableCell>
                <TableCell align="center">{train.mr}</TableCell>
                <TableCell align="center">
                  {train.vitesse_moy !== null ? (
                    <>{train.vitesse_moy} km/h</>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {train.statutSAM === 'OK' && (
                    <span
                      className="statut"
                      style={{
                        backgroundColor: 'var(--sncf-success-bg)',
                      }}
                    >
                      {train.statutSAM}
                    </span>
                  )}
                  {train.statutSAM === 'NOK' && (
                    <span
                      className="statut"
                      style={{
                        backgroundColor: 'var(--sncf-error-bg)',
                      }}
                    >
                      {train.statutSAM}
                    </span>
                  )}
                  {train.statutSAM === null && (
                    <span
                      className="statut"
                      style={{
                        backgroundColor: 'var(--sncf-warning-bg)',
                      }}
                    >
                      HS
                    </span>
                  )}

                  {train.statut50592 === 'OK' && (
                    <span
                      className="statut"
                      style={{
                        backgroundColor: 'var(--sncf-success-bg)',
                      }}
                    >
                      {train.statut50592}
                    </span>
                  )}
                  {train.statut50592 === 'NOK' && (
                    <span
                      className="statut"
                      style={{
                        backgroundColor: 'var(--sncf-error-bg)',
                      }}
                    >
                      {train.statut50592}
                    </span>
                  )}
                  {train.statut50592 === null && (
                    <span
                      className="statut"
                      style={{
                        backgroundColor: 'var(--sncf-warning-bg)',
                      }}
                    >
                      HS
                    </span>
                  )}
                </TableCell>
                <TableCell align="left" style={{padding:'6px'}}>
                  <Link
                    to={`/syrenne/${train.dateFichier}/${train.heureFichier}/${train.site}`}
                    target="_blank"
                  >
                    {train.imagemini !== null && (
                    <div className="img-container">
                    <img
                      className="thumbnail"
                      style={{width:'75px',height:'5vh', marginRight:'3px'}} src={train.imagemini} alt='img-mini'
                      
                      />
                    <span className="second-image">
                      <img  style={{width:'270px',height:'17vh', marginRight:'-30px'}} src={train.imagemini}  alt='img-max'/>
                    </span>
                  </div>
                    
                    
                    )}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  {train.meteo !== null ? (
                    <>
                      {train.meteo?.Temperature_degC}°C&nbsp;|&nbsp;
                      {train.meteo?.Humidite_rel}%&nbsp;|&nbsp;
                      {train.meteo?.PressionAtmo_hPa}A
                    </>
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
              {open[index] && (
                <>
                  {train.vitesse_moy !== null && (
                    <TableRow>
                      <td colSpan={12} style={{ padding: '0px 25px' }}>
                      <h3 style={{ backgroundColor: '#0088ce', color: 'white', padding: '10px' }}>SAM S005</h3>

                        <div colSpan={12} style={{ width:'95%' ,marginTop:'20px',marginLeft:'20px'}}>
                          <span style={{fontWeight: 'bold',marginTop:'30px'}}>Nombre d'essieux: {train.NbEssieux}</span>
                          <div  style={{ marginTop:'10px',paddingBottom:'5px',display: "flex", width: "100%", justifyContent: "space-between", border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "8px", boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.1)", backgroundColor: "#f5f5f5" }}>
                            {train.NbOccultations?.map((occ, index) =>
                              occ === train.NbEssieux ? (

                                <div className="ev"  key={index}  style={{ marginTop: '10px', flex: "1", textAlign: "center" }}>
                                  EV{index + 1}=
                                  <span  style={{ fontWeight: 'bold', marginRight: '20px', color: occ === train.NbEssieux ? 'black' : 'var(--sncf-error-bg)' }}>
                                    {occ}
                                  </span>
                                </div>
                              ) : (
                                <div className="ev"  key={index}  style={{ marginTop: '10px', flex: "1", textAlign: "center" }}>
                                  EV{index + 1}=
                                  <span
                                   style={{ fontWeight: 'bold', marginRight: '20px', color: occ === train.NbEssieux ? 'black' : 'var(--sncf-error-bg)' }}
                                  >
                                    {occ}
                                  </span>
                                </div>
                              )
                            )}
                             
                          </div>
                          <div colSpan={12} style={{ width: '100%', display: 'flex', flexWrap: 'nowrap' }}>
  <div className="m" style={{ flex: '1' }}>
  <ul><li style={{ fontWeight: 'bold',marginTop:'15px' ,marginLeft:'20px'}}>   Temps t1, t2, et t3 : &nbsp;
   
   <Link
     to={`/temps/${train.datesam}/${train.heuresam}/${train.site}`}
     target="_blank"
     style={{ color: '#0088ce', fontWeight: 'bold'}}
   >
     {train.datesam}_{train.heuresam}_{train.site}
   </Link></li></ul>
 
  </div>

  {train.statutSAM === 'NOK' && (
    <div className="r" style={{ flex: '1' }}>
      <ul><li style={{ fontWeight: 'bold',marginTop:'15px'  }}> Enveloppe signaux EV1 à EV8:

<Link
  to={`/SAMS005/${train.datesam}/${train.heuresam}/${train.site}`}
  target="_blank"
  style={{ color: '#0088ce', fontWeight: 'bold' }}
>
  {train.datesam}_{train.heuresam}
</Link></li></ul>
     
    </div>
  )}
</div>

                        </div>
                      
                      </td>
                    </TableRow>
                  )} 
                  {train.meteo !== null && (
                    <TableRow>
                      <td colSpan={8} className='m50' style={{ padding: '0px 25px' }}>
                      <h3 style={{ backgroundColor: '#0088ce', color: 'white', padding: '10px',fontWeight: 'bold',marginTop:'20px' }}>50592</h3>

                        <div>
                        <Link 
                        to={`/50592/${train.date50592}/${train.heure50592}/${train.site}`}
                        target="_blank"
                        style={{ ...linkStyle, ...(isHovered ? linkHoverStyle : null), color: '#0088ce', fontWeight: 'bold' }}
                        className="custom-link"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      ><uk><li style={{marginTop:'20px',marginLeft:'25px'}}><span style={{ color: 'black', fontWeight: 'bold' }}>Résultats FFT - ERA\ERTMS\033281 : &nbsp;
                      FFT Rail 1 et 2 :</span> {train.date50592}-{train.heure50592}</li></uk>
                        
                      </Link>
                  
                </div>
                        <div className="l" style={{width:'100%'}} >
                          <TableResultat
                            blr1={train.blr1}  blr2={train.blr2}  ber1={train.ber1}  ber2={train.ber2}
                            parBE={train.entetesbe}  parBL={train.entetesbl} parOB={train.entetehorsbande}  ob={train.outofband}
                            fob={train.fondhorsbande} freqBL={train.frequencebl}
                          />
                        </div>
                  
                      </td>
                    </TableRow>
                  )}
                       
                </>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      </div>
     
      {trainsFiltres.length > itemsPerPage && (
          <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={pageRangeDisplayed}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          previousClassName={'previous'}
          nextClassName={'next'}
          disabledClassName={'disabled'}
          pageClassName={'page'}
          breakClassName={'break'}
          previousLinkClassName={'previous-link'}
          nextLinkClassName={'next-link'}
          pageLinkClassName={'page-link'}
          breakLinkClassName={'break-link'}
        />
        )}
        <div className='parent-page'>
          
          <button className='btn-page'
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 0}
          >
            Précedent
          </button>
           Page: {currentPage + 1} / {pageCount}
          <button className='btn-page'
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={currentPage === pageCount - 1}
          >
            Suivant
          </button>
        </div>
      </>
    )
  }
  return <></>
})
export default CollapsibleTable