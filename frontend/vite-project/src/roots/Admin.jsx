import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Admin = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const recipesToApprove = [
    { id: 1, title: 'Submitted Recipe 1', imageUrl: 'https://www.southernliving.com/thmb/pKa7sB3W1hp0r9ElK4NUYLOCXCw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/southern-living-27338_Green_Chile_Mac_And_Cheese_With_Chicken_303-7416f067f07f4bf3b6b8aaeddff4542b.jpg' },
    { id: 2, title: 'Submitted Recipe 2', imageUrl: 'https://www.southernliving.com/thmb/pKa7sB3W1hp0r9ElK4NUYLOCXCw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/southern-living-27338_Green_Chile_Mac_And_Cheese_With_Chicken_303-7416f067f07f4bf3b6b8aaeddff4542b.jpg' },
  ];

  const handleOpenRecipe = (recipeId) => {
    alert(`Recipe with ID: ${recipeId} opened`);
  };

  const handleReject = (recipeId) => {
    setSelectedRecipe(recipeId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMessage('');
  };

  const handleAccept = (recipeId) => {
    alert(`Recipe with ID: ${recipeId} accepted`);
  };

  const handleSendMessage = () => {
    alert(`Message for recipe ID: ${selectedRecipe} - ${message}`);
    handleCloseDialog();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Admin Page
      </Typography>
      <Grid container spacing={2}>
        {recipesToApprove.map(recipe => (
          <Grid key={recipe.id} item xs={12} sm={6} md={3}>
            <Card onClick={() => handleOpenRecipe(recipe.id)} sx={{ cursor: 'pointer' }}>
              <CardMedia
                component="img"
                sx={{ height: 140 }}
                image={recipe.imageUrl}
                alt={recipe.title}
              />
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'green',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'darkgreen',
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAccept(recipe.id);
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'red',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'darkred',
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReject(recipe.id);
                    }}
                  >
                    Reject
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Reject Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add a message for rejecting the recipe.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            variant="standard"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Admin;
