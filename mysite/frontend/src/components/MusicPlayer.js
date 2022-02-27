import React, { useState, useEffect } from 'react'
import { Box, IconButton, Grid, Typography, Card, LinearProgress, Button } from '@material-ui/core'
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import SkipNextIcon from "@material-ui/icons/SkipNext"
import PauseIcon from "@material-ui/icons/Pause"
import SendIcon from "@material-ui/icons/Send"
import { Collapse } from '@material-ui/core'
import { Alert } from "@material-ui/lab"


const MusicPlayer = (props) => {

const pauseSong=()=>{
  console.log("Pause")
  const requestOptions ={
    method:'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch('/spotify/pause/', requestOptions);
}

const playSong=()=>{
  console.log("Play")
  const requestOptions ={
    method:'PUT',
    headers:{"Content-Type": "application/json"},
  };
  fetch('/spotify/play/', requestOptions);
}

const skipSong=()=>{
  console.log("Skip")
  const requestOptions ={
    method:'POST',
    headers:{"Content-Type": "application/json"},
  };
  fetch('/spotify/skip/', requestOptions);
}

  const songProgress = (props.time / props.duration) * 100;
  return (
    <Box sx={{ mx: "auto", py:2 }}>
      <Card>
            <Grid container alignItems="center">
                <Grid item xs={4} align="center">
                    <img src={props.image_url} height="100%" width ="100%" />
                </Grid>
                  <Grid item xs={8} align="center">
                      <Typography component="h5" variant="h5">
                          {props.title}
                      </Typography>
                      <Typography color="textSecondary" variant="subtitle1">
                          {props.artist}
                      </Typography>

                      <IconButton onClick={()=> {props.is_playing ? pauseSong() : playSong()}}>
                          {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                      </IconButton>
                      <IconButton onClick={() => skipSong()}>
                      {props.votes} / {props.votes_required} <SkipNextIcon />  
                      </IconButton>
                  </Grid>
              </Grid>
          <LinearProgress variant="determinate" value ={songProgress} />
        </Card>
        
        <Box sx={{ mx: "auto", pt:2 }}>
        <Grid item xs={12} align="center">
        {props.listen_to_preview == null 
        ? <Collapse in={props.listen_to_preview == null}>
          <Alert severity="error">No Preview Available!!</Alert>
        </Collapse>
        :<Button color="primary" variant="contained" endIcon={<SendIcon />} size="medium" href={props.listen_to_preview} target="_blank">Listen to a preview of this song</Button>
        }
          </Grid>
     </Box>
    </Box>
  )
}

export default MusicPlayer