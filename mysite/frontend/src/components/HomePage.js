import React, { useState, useEffect } from 'react'
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Room from "./Room";
import {BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core"
import Info from './Info';

const HomePage = () => {

  const [roomCode, setRoomCode] = useState ("")

useEffect(()=> {

    fetch('/api/user-in-room/')
    .then((response) => response.json())
    .then((data) => {
      setRoomCode(data.code);
    });
}, [])

const renderHomePage=() =>{
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant='h3' component='h3'>
          Music Controller
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation varient="contained" color="primary">
          <Button color="primary" variant="contained" to='/join' component={Link}> Join a Room</Button>
          <Button color="default" variant="contained" to='/info' component={Link}> Info</Button>
          <Button color="secondary" variant="contained" to='/create' component={Link}> Create a Room</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

const clearRoomCode=() =>{
    setRoomCode("")
}

  return (
    <Router>
        <Routes> 
            <Route exact path='/' element={
            <>
              {roomCode ? (<Navigate to={`/room/${roomCode}`} />) : renderHomePage()}
            </>
           } />
            <Route path='/info' element={<Info />} />
            <Route path='/join/' element={<RoomJoinPage />} />
            <Route path='/create/' element={<CreateRoomPage />} />
            <Route path='/room/:roomCode' element={<Room leaveRoomCallback={clearRoomCode}/>} />
        </Routes>
    </Router>
  )
}

export default HomePage