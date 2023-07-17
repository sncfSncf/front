import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import '../../App.css';
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
import Select, { components } from "react-select";

// CollapsibleTable
  
const CollapsibleTable = React.forwardRef(({ trains, onSearchSamChange = () => {}, onSearch50592Change = () => {} }, ref) => {


    useImperativeHandle(ref, () => ({
      childMethod() {
        refreshTrains()
      }
    }))

    
  const [trainsFiltres, setTrainsFiltres] = useState(trains);
  const [open, setOpen] = useState({});
  const option50592 = [{value:'OK',label:'OK'},{value:'NOK',label:'NOK'}]
  const optionSAM = [{value:'OK',label:'OK'},{value:'NOK',label:'NOK'}]
  const [refreshKey, setRefreshKey] = useState(0);

  const InputOption = ({
    getStyles,
    Icon,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    ...rest
  }) => {
    const [isActive, setIsActive] = useState(false);
    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);
  
    // styles
    let bg = "transparent";
    if (isFocused) bg = "#eee";
    if (isActive) bg = "#B2D4FF";
  
    const style = {
      alignItems: "center",
      backgroundColor: bg,
      color: "inherit",
      display: "flex "
    };
  
    // prop assignment
    const props = {
      ...innerProps,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      style
    };
  
    return (
      <components.Option
        {...rest}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        getStyles={getStyles}
        innerProps={props}
      >
        <input type="checkbox" checked={isSelected} />
        <span style={{ marginLeft: '5px' }}></span>
        {children}
      </components.Option>
    );
  };
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
    setCurrentPage(0)
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  
 



  const handleSearchSamChange = (value) => {
        setCurrentPage(0)
    if(value.length>1){
      onSearchSamChange('uniquement sam')
      setInputValues((prevValues) => ({
        ...prevValues,
        searchSam: 'uniquement sam',
        
      }));
    
    }
    else if(value.length===1){
      onSearchSamChange(value[0])
      setInputValues((prevValues) => ({
        ...prevValues,
        searchSam: value[0],
      }));
  
    }
    else{
      onSearchSamChange('')
      setInputValues((prevValues) => ({
        ...prevValues,
        searchSam: '',
      }));
    }
  };
  const handleSearch50592Change = (value) => {
    // const handleSearch50592Change = (value) => {
    //   setCurrentPage(0)
    //   // alert(value)
    //   onSearch50592Change(value)
    //   setInputValues((prevValues) => ({
    //     ...prevValues,
    //     search50592: value,
    //   }));
    // };
    setCurrentPage(0)
    if(value.length>1){
      onSearch50592Change('uniquement 50592')
      console.log("50592:PP",inputValues)

      setInputValues((prevValues) => ({
        ...prevValues,
        search50592: 'uniquement 50592',
      }));
      
    console.log("50592:PP",inputValues)
    }
    else if(value.length===1){
      onSearch50592Change(value[0])
      setInputValues((prevValues) => ({
        ...prevValues,
        search50592: value[0],
      }));
  
    }
    else{
      onSearch50592Change('')
      setInputValues((prevValues) => ({
        ...prevValues,
        search50592: '',
      }));
    }

  
  };


  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };


  // Filtrer l'ancien tableau quand l'utilisateur saisit dans l'input
  useEffect(() => {
    if(inputValues){
    const filteredTrains = trains.filter((train) => {
      // console.log("compare",inputValues.searchDate,train.datesam+"-"+train.heuresam,inputValues.searchDate&&(!(train.datesam+"-"+train.heuresam).includes(inputValues.searchDate)))

      // console.log("filtering",        inputValues.search50592,
      //   train.statut50592,inputValues.search50592.toUpperCase(),"=>",inputValues.search50592 &&
      //   train.statut50592 !== inputValues.search50592.toUpperCase())
      if (inputValues.searchDate&&
        (!(train.datesam+"-"+train.heuresam).includes(inputValues.searchDate) )      ) {
          // console.log("dateFilter",(train.datesam+"-"+train.heuresam).includes(inputValues.searchDate) )


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
        (( train.statutSAM !== inputValues.searchSam.toUpperCase() && inputValues.searchSam!=='uniquement sam' ) || (!train.statutSAM) )

      ) {
        console.log("filtrageSam",train.statutSAM,inputValues.searchSam.toUpperCase())
        return false;
      }
      if (
        inputValues.search50592 &&  
        // inputValues.statut50592!=='uniquement 50592' &&
      ( ( train.statut50592 !== inputValues.search50592.toUpperCase() && inputValues.search50592!=='uniquement 50592' ) || (!train.statut50592) )
      ) {
        return false;
      }
      return true; //pas de filtre appliquée
    });

    console.log("Filtrage",filteredTrains)
    const indexOfLastTrain = (currentPage + 1) * itemsPerPage;
    const indexOfFirstTrain = indexOfLastTrain - itemsPerPage;
    const currentTrains = filteredTrains.slice(
      indexOfFirstTrain,
      indexOfLastTrain
    );
console.log("debug","currentTrains",currentTrains,trains,inputValues, currentPage)
    setTrainsFiltres(currentTrains);
  }}, [trains, inputValues, currentPage]);
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
      <>
      
      <div style={{ width: '100%', overflowX: 'auto' }}>
 

  <Table aria-label="collapsible table">
    <TableHead>
      <TableRow>
        <TableCell />

        <TableCell align="center" style={{ verticalAlign: 'top' }}>
          <div style={{ fontWeight: 'bold' }}>Horodatage</div>
          {/* <div>
            <input
            style={{fontWeight: 'bold' ,padding:'8px',border:'none',padding:'7px',marginTop:'3px'}}
              type="text"
              value={inputValues.searchDate}
              name="searchDate"
              onChange={handleSearchChange}
              placeholder=" "
             
            />
          </div> */}
        </TableCell>

        <TableCell align="center" style={{ verticalAlign: 'top' }}>
          <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>N° train</div>
          <div>
            <input
            style={{fontWeight: 'bold' ,padding:'8px',border:'none',padding:'7px',marginTop:'3px'}}
              type="text"
              value={inputValues.searchNumero}
              name="searchNumero"
              onChange={handleSearchChange}
              placeholder=" "
            />
          </div>
        </TableCell>

        <TableCell align="center" style={{ verticalAlign: 'top' }}>
          <div style={{ fontWeight: 'bold' }}>identification MR</div>
          <div>
            <input
            style={{fontWeight: 'bold' ,padding:'8px',border:'none',padding:'7px',marginTop:'3px'}}
              type="text"
              value={inputValues.searchIdentification}
              name="searchIdentification"
              onChange={handleSearchChange}
              placeholder=" "
            />
          </div>
        </TableCell>

        <TableCell align="center" style={{ verticalAlign: 'top' }}>
          <div style={{ fontWeight: 'bold' }}>Vitesse moyenne</div>
          <div>
            <input
            style={{fontWeight: 'bold' ,border:'none',padding:'7px',marginTop:'3px'}}
              type="text"
              name="searchVitesse"
              value={inputValues.searchVitesse}
              onChange={handleSearchChange}
              placeholder=" "
            />
          </div>
        </TableCell>

        <TableCell  align="center" style={{ verticalAlign: 'top',width:'100%'}}>
          <div style={{ display: 'flex' }}>
          <div style={{width:'200px'}}>
              <div style={{ fontWeight: 'bold' }}align="center"> SAMS005 </div>
              {}
              {/* <Resultats
                key={`searchSam_${refreshKey}`}
                name="searchSam"
                onChange={handleSearchSamChange}
                options={option50592}
                compStyle={{ height: '2em', backgroundColor: 'white', border: 'none', marginTop: '5px', width: '70%' }}
                value={inputValues.searchSam}
                style={{ height: '30px', marginRight: '10px', paddingLeft: '5px' }}
              /> */}


<div style={{ width: '200px'}} >
                       <Select  
                         
                        defaultValue={[]}
                        isMulti
                        closeMenuOnSelect={false}
                        
                        hideSelectedOptions={false}
                        onChange={(options) => {
                          handleSearchSamChange(options.map((opt) => opt.value));
                        }}
                       //  onChange={handleMRChange}
                        placeholder =""
                       components={{
                         Option: InputOption
                       }}
                       
                       
                       
 options={optionSAM} />
                       </div>

            </div>
            <div style={{width:'200px'}}>
              <div style={{ fontWeight: 'bold' }}align="center"> 50592</div>
              {/* <Resultats
                key={`search50592_${refreshKey}`}
                name="search50592"
                onChange={handleSearch50592Change}
                options={optionSAM}
                compStyle={{ height: '2em', backgroundColor: 'white', border: 'none', marginTop: '5px', width: '70%' }}
                value={inputValues.search50592}
                style={{ height: '30px', border: 'none', marginTop: '5px', marginRight: '10px', paddingLeft: '5px', backgroundColor: 'white' }}
              /> */}


<div style={{width: '200px'}} align="center">
<Select  
                         
                         defaultValue={[]}
                         isMulti
                         closeMenuOnSelect={false}
                         hideSelectedOptions={false}
                         placeholder =""
                         onChange={(options) => {
                           handleSearch50592Change(options.map((opt) => opt.value));
                         }}
                        //  onChange={handleMRChange}
 
                        components={{
                          Option: InputOption
                        }}
                        
                        
                        
  options={option50592} />
                       </div>



            </div>
          </div>
        </TableCell>

        <TableCell style={{ verticalAlign: 'top' }} align="center" >
          <div style={{ fontWeight: 'bold' }}> SYRENE</div>
        </TableCell>

        <TableCell style={{ verticalAlign: 'top' }} align="center" >
          <div style={{ fontWeight: 'bold' }}>
            <img src={temp} alt="Température / Humidité / courant dans le rail" style={{ height: '65px', width: '100px', marginTop: '-2px' }} />
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
                <TableCell align="center" style={{ width: '80px', whiteSpace: 'nowrap' }}>
  { (train.dateFichier !== null && train.dateFichier !== undefined)
    ? train.dateFichier + '-' + train.heureFichier
    : (train.datesam !== null && train.datesam !== undefined) 
    ? train.datesam + '-' + train.heuresam
    : train.date50592 + '-' + train.heure50592
  }
</TableCell>


                <TableCell align="center" style={{width: '80px'}}>{train.numTrain}</TableCell>
                <TableCell align="center" style={{width: '80px'}} >{train.mr}</TableCell>
                <TableCell align="center" style={{width: '80px'}}>
                  {train.vitesse_moy !== null ? (
                    <>{train.vitesse_moy} km/h</>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell style={{ textAlign: 'center',width: '400px' }}>
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
                        width: '100%'
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
                        width: '100%'
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
                        width: '100%'
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
                        width: '100%'
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
                        width: '100%'
                      }}
                    >
                      HS
                    </span>
                  )}
                </TableCell>
                <TableCell align="center" style={{padding:'10px',minwidth:'100px'}}>
                  <Link
                    to={`/syrenne/${train.dateFichier}/${train.heureFichier}/${train.site}`}
                    target="_blank"
                  >
                    {train.imagemini !== null && (
                    <div className="img-container" style={{width: '100px'}} align="center" >
                    <img
                      className="thumbnail"
                      style={{width:'75px',height:'5vh', marginRight:'3px'}} src={train.imagemini} alt='img-mini'
                      
                      />
                    <span className="second-image">
                      <img  style={{width:'270px',height:'17vh'}} src={train.imagemini}  alt='img-max'/>
                    </span>
                  </div>
                    
                    
                    )}
                  </Link>
                </TableCell>
                <TableCell align="center" style={{width: '100%'}}>
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
              </TableRow >
              {open[index] && (
                <>
                  {train.vitesse_moy !== null && (
                    <TableRow>
                      <td colSpan={12} style={{ padding: '0px 25px' }}>
                      <h3 style={{ backgroundColor: '#0088ce', color: 'white', padding: '10px' }}>SAM S005</h3>

                        <div colSpan={12} style={{ width:'95%' ,marginTop:'20px',marginLeft:'20px'}}>
                          <span style={{fontWeight: 'bold',marginTop:'30px'}}>Nombre d'essieux : {train.NbEssieux}</span>
                          <div  style={{ marginTop:'10px',paddingBottom:'5px',display: "flex", width: "100%", justifyContent: "space-between", border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "8px", boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.1)", backgroundColor: "#f5f5f5" }}>
                            {train.NbOccultations?.map((occ, index) =>
                              occ === train.NbEssieux ? (

                                <div className="ev"  key={index}  style={{ marginTop: '10px', flex: "1", textAlign: "center" }}>
                                  EV{index + 1} = &nbsp;
                                  <span  style={{ fontWeight: 'bold', marginRight: '20px', color: occ === train.NbEssieux ? 'black' : 'var(--sncf-error-bg)' }}>
                                    {occ}
                                  </span>
                                </div>
                              ) : (
                                <div className="ev"  key={index}  style={{ marginTop: '10px', flex: "1", textAlign: "center" }}>
                                  EV{index + 1} = &nbsp;
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
      <ul><li style={{ fontWeight: 'bold',marginTop:'15px'  }}> Enveloppe signaux EV1 à EV8 : &nbsp;

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
      <div align="center" style={{padding:'10px'}}>
      <table style={{ borderCollapse: 'collapse', width: '100%', border: 'none' }}>
      <thead>
        <tr>
          <th style={{ backgroundColor: 'transparent', color: '#000', borderBottom: '1px solid #ddd',textAlign: 'left' ,width:'15%' }}><span style={{position: 'relative', left: '5px'}}>Statut</span></th>
          <th style={{ backgroundColor: 'transparent', color: '#000', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
  <span style={{ position: 'relative', left: '5px' }}>Description</span>
</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ backgroundColor: '#82be00', color: '#fff', textAlign: 'left', padding: '8px' }}>OK</td>
          <td style={{ backgroundColor: '#fff', color: '#000', textAlign: 'left', padding: '8px' }}>Aucun dépassement des limites au sens de la NF EN 50592 ; ou aucune occultation selon la SAM S005</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: '#cd0037', color: '#fff', textAlign: 'left', padding: '8px' }}>NOK</td>
          <td style={{ backgroundColor: '#fff', color: '#000', textAlign: 'left', padding: '8px' }}>Dépassement d'au moins une limite au sens de la norme NF EN 50592 ; ou occultation selon la SAM S005</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: '#ffb612', color: '#fff', textAlign: 'left', padding: '8px' }}>HS</td>
          <td style={{ backgroundColor: '#fff', color: '#000', textAlign: 'left', padding: '8px' }}>Le système d'acquisition NF EN 50592 et/ou SAM S005 est Hors Service (passage non enregistré)</td>
        </tr>
      </tbody>
    </table>
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
        <div className='parent-page' style={{marginBottom:'50px'}}>
          
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
      </div>

      
    
      </>
    )
  }
  return <></>
})
export default CollapsibleTable
