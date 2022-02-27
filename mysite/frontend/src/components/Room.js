import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router"
import { useParams } from 'react-router-dom'
import { Box, Button, Grid, Typography, FormHelperText } from '@material-ui/core'
import CreateRoomPage from './CreateRoomPage'
import MusicPlayer from './MusicPlayer'
import SettingsIcon from '@mui/icons-material/Settings';

const Room = (props) => {

    const [guestCanPause, setGuestCanPause] = useState (false)
    const [votesToSkip, setVotesToSkip] = useState (2)
    const [isHost, setIsHost] = useState (false)
    const [showSettings, setShowSettings] = useState (false)
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false)
    const [song, setSong] = useState ({})

    const { roomCode } = useParams()
    const navigate = useNavigate()

    const authenticateSpotify =() =>{
      fetch('/spotify/is-authenticated/')
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status)
        if (!data.status) {
          fetch('/spotify/get-auth-url/')
          .then((response)=> response.json())
          .then((data) => {
            window.location.replace(data.url)
          })
        }
      })
    }

    const getRoomDetails= () => {
        fetch('/api/get-room'+'?code='+roomCode)
        .then((response) => {
            if(!response.ok){
                props.leaveRoomCallback();
                navigate("/");
            }
              return response.json()
        })
        .then((data) =>{
            setVotesToSkip(data.votes_to_skip),
            setGuestCanPause(data.guest_can_pause),
            setIsHost(data.is_host)
        })
        if (isHost) {
              authenticateSpotify();
          }
      }

    const leaveButtonPressed= () =>{
      const requestOptions ={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      };
      fetch("/api/leave-room/", requestOptions)
      .then((_response) => {
        props.leaveRoomCallback();
        navigate("/");
      })
    }

    const updateShowSettings= (value) => {
      setShowSettings(value)
    }

    const renderSettingsButton=() =>{
      return(
        <Grid item xs={12} align="center">
          <SettingsIcon sx={{
              "&:hover": {
                            cursor: "pointer",
                            fontSize: 37,
                         }
           }} variant="contained" fontSize="large" onClick={() => updateShowSettings(true)}  />
        </Grid>
          )
        }
     
    const renderSettings=() => {

      return(
        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage update={true} votesToSkip={votesToSkip} guestCanPause={guestCanPause} roomCode={roomCode} updateCallback={getRoomDetails} />
        </Grid>
        <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" onClick={() => updateShowSettings(false)}>Close</Button>
        </Grid>
        </Grid>
      )
    }

  const getCurrentSong= () =>{
      fetch('/spotify/current-song/')
      .then((response) => {
        if(response.status === 204){
          return {};
        }
        else{
        return response.json()
        }
      })
      .then((data) => {
       setSong(data)
      })
    }

  useEffect(()=> {
   getRoomDetails();
   },[isHost])

   useEffect(()=>{
    setInterval(getCurrentSong, 2500)
   },[])

 let sizeOfCode = 12;

   if (isHost){
     sizeOfCode = 11;
   }

    return (
      <>
      {showSettings ?  renderSettings() :
        <Grid container spacing={1}>
        <Grid item xs={sizeOfCode} align="center">
          <Typography variant='h4' component ="h4">
            Code: {roomCode}
          </Typography>
          <FormHelperText>
            <div align="center">Share this code, for others to join your Room.</div>
          </FormHelperText>
        </Grid>
        {isHost ?
        <Box sx={{ mx: "auto", pt:1 }}>
        <Grid item xs={1} align="center">
          {renderSettingsButton()}
        </Grid> </Box> : null
        }
        <MusicPlayer {...song} />
        <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" onClick={leaveButtonPressed}>Leave Room</Button>
        </Grid>
      </Grid>
     } 
    </>
  )
}

export default Room