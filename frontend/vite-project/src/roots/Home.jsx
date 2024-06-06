import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import CountUp from 'react-countup';
import { Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {
  async function handleClick(type) {
    const recipes = (await axios.get(`http://localhost:5001/home/${type}`)).data;
    console.log(recipes);
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Card sx={{ display: 'flex', width: '100%', mb: 4, position: 'relative' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <CardContent>
            <Typography component="div" variant="h2" sx={{ fontWeight: 'bold' }}>
              Explore Recipes
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 2 }}>
              Start exploring recipes today! Search user generated ones or even create your own!
            </Typography>
            <Link
              to={{
                pathname: '/recipes',
              }}
              style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: '#2e6123',
                  fontSize: '1.2rem',
                  padding: '0.75rem 1.5rem',
                  '&:hover': {
                    backgroundColor: '#1e4a1c',
                  },
                }}
              >
                Browse Recipes
              </Button>
            </Link>
          </CardContent>
        </Box>
        <Box sx={{ position: 'relative', width: '50%', border : '2px solid #2e6123'}}>
          <CardMedia
            component="img"
            sx={{ width: '100%', objectFit: 'contain' }}
            image="topHome.jpeg"
            alt="Welcome image"
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(46,97,35, 0.25)', 
            }}
          />
        </Box>
      </Card>

      <Card className="homeLongBanner" sx={{ display: 'flex', width: '100%', mb: 4, p: 2, borderLeft: '20px solid #2e6123' }}>
        <Grid container>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h6">
              Explore
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              <CountUp start={0} end={10000} duration={2} />+
            </Typography>
            <Typography variant="h6">
              Recipes
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h6">
              Sort by
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              <CountUp start={0} end={35} duration={2} />+
            </Typography>
            <Typography variant="h6">
              Diets
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h6">
              Filter by
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              <CountUp start={0} end={5} duration={2} />
            </Typography>
            <Typography variant="h6">
              Meal Types
            </Typography>
          </Grid>
        </Grid>
      </Card>

      <Typography variant="h3" sx={{ mb: 2 }}>
        Popular Categories:
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardMedia
              component="img"
              sx={{ height: 140, borderBottom: '7px solid #2e6123', minHeight : '18vh', maxHeight: '18vh' }}
              image="homeFood1.jpeg"
              alt="Dish Image"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Mexican Food
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore popular Mexican food recipes trending online now.
              </Typography>
              <Button variant="outlined" sx={{ mt: 2, borderColor: '#2e6123', color: '#2e6123', '&:hover' : {backgroundColor: 'rgba(46, 97, 35, 0.04)', borderColor: '#2e6123'} }} onClick={() => handleClick("mexican")}>
                View Recipes
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardMedia
              component="img"
              sx={{ height: 140, borderBottom: '7px solid #2e6123', minHeight : '18vh', maxHeight: '18vh' }}
              image="homeFood2.jpeg"
              alt="Dish Image"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Vegan Recipes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Craving delicious Vegan options? We have you covered.
              </Typography>
              <Button variant="outlined" sx={{ mt: 2, borderColor: '#2e6123', color: '#2e6123', '&:hover' : {backgroundColor: 'rgba(46, 97, 35, 0.04)', borderColor: '#2e6123'} }} onClick={() => handleClick("vegan")}>
                View Recipes
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardMedia
              component="img"
              sx={{ height: 140, borderBottom: '7px solid #2e6123', minHeight : '18vh', maxHeight: '18vh' }}
              image="homeFood3.jpeg"
              alt="Dish Image"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Desserts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Looking for something to satisfy your sweet tooth? Look no longer.
              </Typography>
              <Button variant="outlined" sx={{ mt: 2, borderColor: '#2e6123', color: '#2e6123', '&:hover' : {backgroundColor: 'rgba(46, 97, 35, 0.04)', borderColor: '#2e6123'} }} onClick={() => handleClick("desserts")}>
                View Recipes
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardMedia
              component="img"
              sx={{ height: 140, borderBottom: '7px solid #2e6123', minHeight : '18vh', maxHeight: '18vh' }}
              image="homeFood4.jpeg"
              alt="Dish Image"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Keto Options
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Struggling with Keto diet restrictions? Explore our array of options!
              </Typography>
              <Button variant="outlined" sx={{ mt: 2, borderColor: '#2e6123', color: '#2e6123', '&:hover' : {backgroundColor: 'rgba(46, 97, 35, 0.04)', borderColor: '#2e6123'} }} onClick={() => handleClick("keto")}>
                View Recipes
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <br></br>
      <hr style = {{background: '#2e6123'}}></hr>
      <Box sx={{ position: 'relative', width: '100%', mt: 4, height: '30vh', backgroundImage: 'url(https://www.finedininglovers.com/sites/g/files/xknfdk626/files/styles/article_1200_800_fallback/public/2022-11/Stanly%20Ranch%20%289%29.jpg?itok=yJb7-jgU)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(46, 97, 35, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography component="div" variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
            What are you waiting for?
          </Typography>
        </Box>
      </Box>
      <br></br>
      <hr style = {{background: '#2e6123'}}></hr>

      <br></br>
      <br></br>
    </Box>
  );
};

export default Home;
