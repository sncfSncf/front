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
import { useState, useEffect } from 'react'
import TableResultat from '../traitements/traitementCouleur'
import NF50592 from '../../pages/50592'
import Resultats from '../../components/SelectList/resultats'
export default function CollapsibleTable({ trains }) {
  const [trainsFiltres, setTrainsFiltres] = useState(trains);
  const [open, setOpen] = useState({});
  const [inputValues, setInputValues] = useState({
    searchNumero: '',
    searchIdentification: '',
    searchVitesse: '',
    searchSam: '',
    search50592: '',
    searchSyrenne: '',
  });
  const options = ['Ok', 'NOK']
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 50;


  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
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
          value={inputValues.searchNumero}
          name="searchNumero"
          onChange={handleSearchChange}
          placeholder=" "
          style={{ width: '70%',height:'30px',border:'none',marginTop:'5px' }}
        />
      </div>
    </TableCell>

    <TableCell align="center" style={{ verticalAlign: 'top'}}>
      <div style={{  fontWeight: 'bold' }}>N° train</div>
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
        <input
          className=" methodes"
          type="text"
          name="searchSam"
          value={inputValues.searchSam}
          onChange={handleSearchChange}
          placeholder="SAM"
          style={{ width: '50%',height:'30px',border:'none',marginTop:'5px',marginRight:'10px',paddingLeft:'5px'}}
        />
        <input
          className=" methodes"
          type="text"
          name="search50592"
          value={inputValues.search50592}
          onChange={handleSearchChange}
          placeholder="50592"
          style={{ width: '50%',height:'30px',border:'none',marginTop:'5px',paddingLeft:'5px'}}
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
                      <td colSpan={8} style={{ padding: '0px 25px' }}>
                        <h3>SAM S005</h3>
                        <div className="l sam">
                          <span>Nombre d'essieux: {train.NbEssieux}</span>
                          <div style={{display:"flex",width:'160%'}}>
                            {train.NbOccultations?.map((occ, index) =>
                              occ === train.NbEssieux ? (
                                <div className="ev">
                                  EV{index + 1}=
                                  <span style={{ fontWeight: 'bold' }}>
                                    {occ}
                                  </span>
                                </div>
                              ) : (
                                <div className="ev">
                                  EV{index + 1} =
                                  <span
                                    style={{ color: 'var(--sncf-error-bg)' }}
                                  >
                                    {occ}
                                  </span>
                                </div>
                              )
                            )}
                             <div className="m ">
                          Temps t1, t2, et t3 : &nbsp;
                          <Link
                            to={`/temps/${train.datesam}/${train.heuresam}/${train.site}`}
                            target="_blank"
                          >
                            {train.datesam}_{train.heuresam}_
                            {train.site}
                          </Link>
                        </div>
                          </div>
                        </div>
                       
                        {train.statutSAM === 'NOK' && (
                          <div className="r sam">
                            Enveloppe signaux EV1 à EV8:
                            <Link
                              to={`/SAMS005/${train.datesam}/${train.heuresam}/${train.site}`}
                              target="_blank"
                            >
                              {train.datesam}_{train.heuresam}
                            </Link>
                          </div>
                        )}
                      </td>
                    </TableRow>
                  )} 
                  {train.meteo !== null && (
                    <TableRow>
                      <td colSpan={8} className='m50' style={{ padding: '0px 25px' }}>
                        <h3>50592</h3> &nbsp; &nbsp; &nbsp; <div>
                        <Link
                        to={`/50592/${train.date50592}/${train.heure50592}/${train.site}`}
                        target="_blank"
                        style={{...linkStyle, ...(isHovered ? linkHoverStyle : null)}}
                        className="custom-link"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        Résultats FFT - ERA\ERTMS\033281 : &nbsp;
                        FFT Rail 1 et 2 : {train.date50592}-{train.heure50592}
                      </Link>
                  
                </div>
                        <div className="l">
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
}
