import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Collapse } from '@material-ui/core'
import { Alert } from "@material-ui/lab"
import { useNavigate } from "react-router"

const CreateRoomPage = (props) => {

  const [guestCanPause, setGuestCanPause] = useState (props.guestCanPause)
  const [votesToSkip, setVotesToSkip] = useState (props.votesToSkip)
  const [successMsg, setSuccessMsg] = useState ("")
  const [errorMsg, setErrorMsg] = useState ("")
  
  const navigate = useNavigate()

  const handleVotesChange= (e) => {
    setVotesToSkip(e.target.value)
  }

  const handleGuestsCanPauseChange= (e) => {
    var newValue = e.target.value === "true" ? true : false;
    setGuestCanPause(newValue);
  }

  const handleRoomButtonPressed= (e) => {
    
    const requestOptions ={
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause
      }),
    };
 
  if(votesToSkip != ""){
    fetch("/api/create-room/", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      window.location.href = "/room/"+data.code
    })
  }
  else{
    alert("Please enter the 'Votes required to skip song'")
    navigate("/create");
  }
}

  const handleUpdateButtonPressed= (e) => {

    const requestOptions ={
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: props.roomCode,
      }),
    };

    fetch("/api/update-room/", requestOptions)
    .then((response) => {
      if (response.ok){
          setSuccessMsg("Room updated successfully!")
      } else {
          setErrorMsg("Error updating room!")
      }
      props.updateCallback();
    });
  }


  const title = props.update ? "Update Room" : "Create Room";

const renderCreateButtons=() =>{
  return(
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>Create a Room</Button>
        </Grid>
        <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link} >Back</Button>
      </Grid>
    </Grid>
  )
}

const renderUpdateButtons=() =>{
  return(
        <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handleUpdateButtonPressed}>Update</Button>
        </Grid>
  )
}

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg != "" || successMsg !=""}>
          {successMsg != "" ? (<Alert severity="success" onClose={() => {setSuccessMsg("")}}>{successMsg}</Alert>) :(<Alert severity="error" onClose={() => {setErrorMsg("")}}>{errorMsg}</Alert>)}
        </Collapse>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
       <FormControl component="fieldset">
         <FormHelperText>
           <div align="center">Guest Control of Playback State</div>
         </FormHelperText>

         <RadioGroup row defaultValue={guestCanPause.toString()} onChange={handleGuestsCanPauseChange}>
           <FormControlLabel 
            value="true"
            control={<Radio color="primary" />} 
            label="Play/Pause"
            labelPlacement="bottom" />

           <FormControlLabel 
            value="false" 
            control={<Radio color="secondary" />} 
            label="No Control" 
            labelPlacement="bottom" />
         </RadioGroup>
       </FormControl>
      </Grid>

    <Box sx={{ mx: "auto", py:2 }}>
      <Grid item xs={12} alignItems="center">
        <FormControl>
          <TextField 
            label="Votes"
            required
            type="number" 
            variant="filled"
            onChange={handleVotesChange}
            defaultValue= {votesToSkip}
            inputProps={{min:1, style:{textAlign: "center", backgroundColor: "#F8F8F8", borderRadius: "5px"}}} />
          <FormHelperText>
            <div align="center">Votes required to skip song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      </Box>
      {props.update ? renderUpdateButtons() : renderCreateButtons() }
      <Box sx={{ mx: "auto", py:2 }}>
      <Grid item xs={12}>
          <Alert severity="info"> Ensure Spotify App is playing music prior to creating a new Room. Once the Room is created, you(the Host) will be redirected to Spotify Login for authentication.</Alert>
      </Grid>
      </Box>
    </Grid>
  )
}

CreateRoomPage.defaultProps = {
  votesToSkip: 2,
  guestCanPause: true,
  update: false,
  roomCode: null,
  updateCallback: () => {},
  }

export default CreateRoomPage