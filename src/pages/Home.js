import { Grid } from '@material-ui/core';
import FormCreatePost from '../components/FormCreatePost';
import Posts from '../components/Posts';

const Home = () => {
  return (
    <Grid container justify='space-between' alignItems='stretch'>
      <Grid item md={7}>
        <Posts />
      </Grid>
      <Grid item md={4}>
        <FormCreatePost />
      </Grid>
    </Grid>
  );
};

export default Home;
