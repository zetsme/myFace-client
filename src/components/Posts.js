import { CircularProgress, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postsActions';
import PostCard from './PostCard';
import Masonry from 'react-masonry-css';

const useStyles = makeStyles((theme) => {
  return {
    masonryGrid: {
      display: 'flex',
      marginLeft: '-30px',
      width: 'auto',
    },
    masonryCols: {
      paddingLeft: '30px',
      backgroundClip: 'padding-box',
      '& > div': {
        marginBottom: '30px',
      },
    },
  };
});
const masonryBreakpoints = {
  default: 2,
  1100: 2,
  700: 1,
  500: 1,
};
const Posts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.postCards);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  //

  //
  return !posts ? (
    <CircularProgress />
  ) : (
    <Masonry
      breakpointCols={masonryBreakpoints}
      className={classes.masonryGrid}
      columnClassName={classes.masonryCols}
    >
      {posts.map((post) => (
        <div key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </Masonry>
  );
};

export default Posts;
