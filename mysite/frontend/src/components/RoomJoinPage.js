import React, { useState } from 'react'
import { useNavigate } from "react-router"
import { Link } from 'react-router-dom'
import { TextField, Button, Grid, Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'

const RoomJoinPage = (props) => {

  const [roomCode, setRoomCode] = useState ("")
  const [error, setError] = useState ("")
  const navigate = useNavigate()

  const handleTextFieldChange= (e) => {
    setRoomCode(e.target.value)
  }

  const roomButtonPressed= () => {
    const requestOptions ={
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: roomCode
      }),
    };
    fetch("/api/join-room/", requestOptions)
    .then((response) => {
      if (response.ok){
        navigate(`/room/${roomCode}`)
        }
      else {
        setError("Room Not Found.")
      }
    }).catch((error)=> console.log(error));
  }

  return (
    <Grid container spacing={1}>
       <Grid item xs={12} align="center">

       <Typography component="h4" variant="h4">
          Join a Room
        </Typography>
       </Grid>
    <Box sx={{ mx: "auto", py:1 }}>
      <Grid item xs={12} align="center"> 
          <TextField
            error= {error}
            label= "Code"
            placeholder="Enter a Room Code.."
            value= {roomCode}
            helperText= {error}
            variant="outlined" 
            onChange={handleTextFieldChange} />
      </Grid>
    </Box>
  
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={roomButtonPressed}>Join Room</Button>
        </Grid>

        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link} >Back</Button>
        </Grid>

    </Grid>
  )
}

export default RoomJoinPage