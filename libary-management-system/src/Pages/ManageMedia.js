import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { MAX_VERTICAL_CONTENT_RADIUS } from 'antd/es/style/placementArrow';

function ManageMedia() {
  const mediaItems = [
    {
      title: "To Kill a Mockingbird",
      image: "https://covers.openlibrary.org/b/id/14817209-L.jpg"
    },
    {
      title: "1984",
      image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    },
    {
      title: "48 Laws of Power",
      image: "https://covers.openlibrary.org/b/id/14821253-L.jpg",
    },
    {
      title: "Design Patterns",
      image: "https://ia801507.us.archive.org/view_archive.php?archive=/14/items/olcovers38/olcovers38-L.zip&file=388950-L.jpg",
    },
    {
      title: "12 Rules for Life",
      image: "https://ia600505.us.archive.org/view_archive.php?archive=/35/items/l_covers_0014/l_covers_0014_33.zip&file=0014338970-L.jpg",
    },
    {
      title: "Rich Dad, Poor Dad",
      image: "https://covers.openlibrary.org/b/id/14809769-M.jpg",
    },
    {
      title: "Romeo and Juliet",
      image: "https://ia800505.us.archive.org/view_archive.php?archive=/35/items/l_covers_0014/l_covers_0014_65.zip&file=0014657730-L.jpg",
    },
    {
      title: "Art of War",
      image: "https://ia800100.us.archive.org/view_archive.php?archive=/5/items/l_covers_0012/l_covers_0012_63.zip&file=0012635040-L.jpg",
    },
  
   ];
  
  
  
  
  
  
   return (
    <Box sx={{ backgroundColor: 'ADD8E6', py: 4, minHeight: '100vh'}}>
      {/* Search Results Title */}
  
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold',mt: 4, mb: 4}}>
        manage Media // ADDED ON PURPOSE FOR LATER
      </Typography>
  
      {/* Media Card Grid */}
  
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 4}}>
        {mediaItems.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Card sx={{ 
              maxWidth: 220, //width of cards
              mx: 'auto',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 3,
              }
              
              }}
              >
              <CardMedia
              component="img"
              height="350" //img height
              image={item.image} //placeholder image for now
              alt={item.title} 
              />
  
              <CardContent> {/*padding top*/}
                <Typography variant="subtitle1" component="div" align="center" sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.7)',}}>
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
      </Grid>
        ))}
        </Grid>
  
    </Box>
   );
}

export default ManageMedia;