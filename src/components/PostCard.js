import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Typography,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Delete, Edit, MoreVert } from '@material-ui/icons';
import { deletePost, setCurrentPostId, likePost } from '../actions/postsActions';
import Like from './Like';
import { useState } from 'react';

const useStyles = makeStyles((theme) => {
  return {
    media: {
      paddingTop: '60%',
    },
    cardActionsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    tagsContainer: {
      display: 'flex',
      gap: theme.spacing(1),
      flexWrap: 'wrap',
      marginBottom: theme.spacing(2),
    },
    menuItem: {
      padding: '10px 15px',
      display: 'flex',
      gap: theme.spacing(2),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  };
});
const PostCard = ({ post }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.result?._id);
  const classes = useStyles();

  return (
    <Card elevation={8}>
      <CardHeader
        title={post.title}
        subheader={moment(post.createdAt).fromNow() + ' by  ' + post.author}
        action={
          userId === post.userId && (
            <div>
              <IconButton aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
                <MoreVert />
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  className={classes.menuItem}
                  onClick={() => {
                    dispatch(setCurrentPostId(post._id));
                    handleClose();
                  }}
                >
                  <Typography variant='h6'>Edit</Typography>
                  <Edit color='primary' />
                </MenuItem>
                <MenuItem
                  className={classes.menuItem}
                  onClick={() => {
                    handleClose();
                    dispatch(deletePost(post._id));
                  }}
                >
                  <Typography variant='h6'>Delete</Typography>
                  <Delete color='error' />
                </MenuItem>
              </Menu>
            </div>
          )
        }
      />
      {post.selectedFile && (
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      )}
      <CardContent>
        <div className={classes.tagsContainer}>
          {post.tags.length > 0 &&
            post.tags[0] &&
            post.tags.map((tag, i) => <Chip color='primary' key={i} label={tag} />)}
        </div>
        <Typography>{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActionsContainer}>
        <Like onClick={() => dispatch(likePost(post._id))} post={post} userId={userId} />
      </CardActions>
    </Card>
  );
};

export default PostCard;
