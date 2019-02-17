import React from 'react'
import bouncer from 'assets/img/bouncers.png'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
// static router renames the context to staticContext
const Forbidden = ({ staticContext = {} }) => {
  staticContext.notFound = true
  return (
    <div style={{display: "flex", overflowX: "hidden", height: "calc(100vh - 40px)", width: "calc(100vw - 40px)", alignItems: "center", justifyContent: "center", padding: "20px"}}>
      <div style={{maxHeight: "calc(100vh - 40px)"}}>
        <div style={{width: "80%", margin: "0 auto"}}>
          <img style={{width: "100%", height: "auto", maxWidth: "600px"}} src={bouncer} />
        </div>
        <div>
          <h4 style={{color: "#a1a1a1", maxWidth: "600px", textAlign: "center"}}>Sorry, but you need to go back the way you came!</h4>
        </div>
        <div style={{display:"flex", justifyContent: "center"}}>
          <NavLink to={'/app'}>
            <Button variant="outlined" color="primary">Go Back</Button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Forbidden
