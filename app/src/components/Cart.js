import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
function DataTable({ cart: { features } }) {
  return (
    <div style={{ minWidth: 800 }}>
      <Container>
        <h3>Your shopping cart</h3>
        {features.map(({ description, sensor, observed_on }, i) => {
          return (
            <Card sx={{ marginBottom: 2 }} key={i}>
              <CardContent>
                <Typography variant='body1' component='div'>
                  {description}
                </Typography>
                <Typography variant='body2' sx={{ mt: 2 }} component='div'>
                  <b>Sonsor</b>: {sensor}
                </Typography>
                <Typography variant='body2' sx={{ mt: 2 }} component='div'>
                  <b>Observed on</b>: {observed_on}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>Remove</Button>
              </CardActions>
            </Card>
          );
        })}
      </Container>
    </div>
  );
}

const selector = ({ cart }) => ({ cart });
export default connect(selector)(DataTable);
