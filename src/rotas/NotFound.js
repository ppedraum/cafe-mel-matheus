import React from 'react'
import classes from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={classes.notFound}>
      <div className={classes.sub}>Sinto muito...</div>
      <div>Página indisponível.</div>
    </div>
  )
}

export default NotFound