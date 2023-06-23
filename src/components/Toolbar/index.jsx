import React from "react";
import { NavLink } from 'react-router-dom'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Toolbar from '@mui/material/Toolbar'
export default function ToolbarRapport(){
    return(
        <Toolbar
        style={{ padding: '0' }}
        className="bleu-active"
        sx={{ backgroundColor: 'white' }}
    >
            <Tabs>
                <NavLink
                    activeClassName="activeJ"
                    to="/journal"
                    exact
                    style={{ textDecoration: 'none' }}
                >
                    <Tab label="Journal" sx={{ color: 'black' }} />
                </NavLink>
                <NavLink
                    activeClassName="activeJ"
                    to="/statistique"
                    style={{ textDecoration: 'none' }}
                >
                    <Tab label="Statistique" sx={{ color: 'black' }} />
                </NavLink>
                <NavLink
                    activeClassName="activeJ"
                    to="/rapports"
                    exact
                    style={{ textDecoration: 'none' }}
                >
                    <Tab label="Rapports" sx={{ color: 'black' }} />
                </NavLink>
            </Tabs>
    </Toolbar>
    )
}