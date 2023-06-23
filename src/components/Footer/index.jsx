import React from 'react'
import { Typography, Link } from '@mui/material'
export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <Typography variant="body2" align="center">
          <Link
            color="inherit"
            href="https://www.sncf.com/fr/service-client/faq#menu+contactez-nous"
          >
            Contacts
          </Link>
          {' | '}
          <Link
            color="inherit"
            href="https://www.sncf.com/fr/service-client/faq"
          >
            FAQ
          </Link>
          {' | '}
          <Link color="inherit" href="https://www.sncf.com/fr/plan-du-site">
            Plan du site
          </Link>
          {' | '}
          <Link color="inherit" href="https://aide.assistant.sncf/hc/fr">
            Aide
          </Link>
        </Typography>
      </footer>
    </div>
  )
}
