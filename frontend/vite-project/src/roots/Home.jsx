import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import CountUp from 'react-countup';

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Card sx={{ display: 'flex', width: '100%', mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <CardContent>
            <Typography component="div" variant="h2" sx={{ fontWeight: 'bold' }}>
              Explore Recipes
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mt: 2 }}>
              Start exploring recipes today! Search user generated ones or even create your own!
            </Typography>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: '#2e6123', fontSize: '1.2rem', padding: '0.75rem 1.5rem' }}>
              Browse Recipes
            </Button>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: '50%', objectFit: 'contain' }}
          image="https://ediblenortheastflorida.ediblecommunities.com/sites/default/files/styles/ariticle_feartured_image_landscape/public/images/aggregator/Spread3-5.jpg?itok=1UFvsM-q"
          alt="Welcome image"
        />
      </Card>

      <Card className="homeLongBanner" sx={{ display: 'flex', width: '100%', mb: 4, p: 2, borderLeft: '20px solid #2e6123' }}>
        <Grid container>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h6">
              Explore
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              <CountUp start={0} end={50} duration={2} />+
            </Typography>
            <Typography variant="h6">
              Recipes
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h6">
              Filter by
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              <CountUp start={0} end={15} duration={2} />+
            </Typography>
            <Typography variant="h6">
              Ingredients
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h6">
              Sort by
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              <CountUp start={0} end={10} duration={2} />+
            </Typography>
            <Typography variant="h6">
              Diets
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
              image="https://www.allrecipes.com/thmb/Y4brle_IWwQ6ll1v4i69TO5sbfI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/102108380-Authentic-Mexican-Cuisine-Photo-by-Meredith-ebaca57279a548d6b6ef266493497fc3.jpg"
              alt="Dish Image"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Mexican Food
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore popular Mexican food recipes trending online now.
              </Typography>
              <Button variant="outlined" sx={{ mt: 2, borderColor: '#2e6123', color: '#2e6123' }}>
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
              image="https://images.everydayhealth.com/images/diet-nutrition/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg?sfvrsn=1d260c85_1"
              alt="Dish Image"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Vegan Recipes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Craving delicious Vegan options? We have you covered.
              </Typography>
              <Button variant="outlined" sx={{ mt: 2, borderColor: '#2e6123', color: '#2e6123' }}>
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
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXzuKZL1VpQ2E-E6ZiDAQZARYrauVMSzA8-w&s"
              alt="Dish Image"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Desserts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Looking for something to satisfy your sweet tooth?
              </Typography>
              <Button variant="outlined" sx={{ mt: 2, borderColor: '#2e6123', color: '#2e6123' }}>
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
              image="https://www.eatingwell.com/thmb/OjqIt-0hf2URXH1LS9CakKOaiUQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/complete-keto-diet-food-list-what-you-can-and-cannot-eat-if-youre-on-a-ketogenic-diet-3-cd4cd1fc60cb455bbe7eee6e3a7d4d2c.jpg"
              alt="Dish Image"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Keto Options
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Struggling with Keto diet restrictions? Explore our array of options!
              </Typography>
              <Button variant="outlined" sx={{ mt: 2, borderColor: '#2e6123', color: '#2e6123' }}>
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
