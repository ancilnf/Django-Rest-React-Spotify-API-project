import React from 'react'
import { Grid, Button, Typography, Card, Box, FormHelperText } from "@material-ui/core"
import { Link } from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const Info = (props) => {

  return (
    <Grid container spacing={1}>
       <Grid item xs={12} align="center">
       <Typography component="h4" variant="h4">
          Music Controller Info
        </Typography>
       </Grid>
       <Grid item xs={12} alignItems="center">
       <Card xs={12} sx= {{ width: 100, display: 'inline'}}>
            {/* <Typography variant="h5" align='center' style= {{ color: "#00308F"}}>
                Welcome
              </Typography> */}
              <FormHelperText>
              <div align="center">This app helps live stream your music to everyone who joins your Room.</div>
            </FormHelperText>
            <Box xs={12} sx={{ mx: "auto", p:2 }}>
              <Typography variant="h6" style={{ backgroundColor: "#F5F5F5", borderRadius: "5px", padding: "6px" }} >
                TO CREATE A ROOM
                  <List sx={{ width: '100%', p:0}}>
                      <ListItem sx={{ px:1, py:0}}>
                          <ListItemText><strong>Step 1:</strong> Click on 'CREATE A ROOM' and select from the options 'Guest Control of Playback State' (enabling the guests to Play/ Pause the music) and the number of votes for 'Votes required to skip song'(the minimum votes required to skip the song).</ListItemText>
                      </ListItem>
                      <ListItem sx={{ px:1, py:0}}>
                          <ListItemText> <strong>Step 2:</strong> Select 'CREATE A ROOM' to auto generate a 'Code' and you will be redirected to Spotify Login page for authentication. </ListItemText>
                      </ListItem>
                      <ListItem sx={{ px:1, py:0}}>
                          <ListItemText> <strong>Step 3:</strong> Post authentication, you will automatically be redirect back to the app. Share the Code, for others to join your Room. </ListItemText>
                      </ListItem>
                      <ListItem sx={{ px:1, py:0}}>
                          <ListItemText> <strong>Step 4:</strong> Once the Room is created, please note only the Host will have the option to update the Settings.</ListItemText>
                      </ListItem>
                  </List>
               </Typography> 
               <br/>
               <Typography variant="h6" style={{ backgroundColor: "#F5F5F5", borderRadius: "5px", padding: "6px" }} >
                TO JOIN A ROOM
                  <List sx={{ width: '100%', p:0}}>
                      <ListItem sx={{ px:1, py:0}}>
                          <ListItemText><strong>Step 1:</strong> Click on the 'JOIN A ROOM' button and enter the Code shared. Select 'JOIN A ROOM' to enter.</ListItemText>
                      </ListItem>
                      <ListItem sx={{ px:1, py:0}}>
                          <ListItemText> <strong>Step 2:</strong> If 'Room not Found' error is displayed. Please re-check the Code and retry. </ListItemText>
                      </ListItem>
                  </List>
               </Typography> 
            </Box>
            </Card>
            </Grid>
            <Box sx={{ mx: "auto", pt:2 }}>
              <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to='/' component={Link}> Back</Button>
              </Grid>
            </Box>
    </Grid>
  )
}

export default Info