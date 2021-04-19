import { Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, removeCurrentPostId, updatePost } from '../actions/postsActions';
import { PhotoCamera } from '@material-ui/icons';
//
const useStyles = makeStyles((theme) => {
  return {
    form: {
      padding: theme.spacing(2),
      '& > :not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
    btnContainer: {
      display: 'flex',
      gap: theme.spacing(2),
      '& > *': {
        flexGrow: 1,
      },
    },
    uploadLabel: {
      display: 'block',
      '& > input': {
        display: 'none',
      },
    },
    paper: {
      marginBottom: theme.spacing(2),
    },
    blankPaperTitle: {
      padding: theme.spacing(2),
    },
  };
});
//
const FormCreatePost = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts?.currentPostId
      ? state.posts.postCards.find((i) => i._id === state.posts?.currentPostId)
      : null
  );
  const auth = useSelector((state) => state.auth);
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post) {
      dispatch(updatePost(post._id, postData));
    } else {
      dispatch(createPost(postData));
    }
    clearFields();
  };

  const handleChange = (e) => setPostData({ ...postData, [e.target.name]: e.target.value });
  const clearFields = () => {
    dispatch(removeCurrentPostId());
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  };
  if (!auth?.result) {
    return (
      <Paper>
        <Typography variant='h5' className={classes.blankPaperTitle}>
          Please login or create new account to make your stories
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper} elevation={8}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Typography variant='h4' color='primary'>
          Create Post
        </Typography>
        <TextField
          value={postData.title}
          onChange={handleChange}
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
        />
        <TextField
          value={postData.message}
          onChange={handleChange}
          variant='outlined'
          name='message'
          label='Message'
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
          variant='outlined'
          name='tags'
          label='Tags (coma separated)'
          fullWidth
        />
        <label className={classes.uploadLabel}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            component='span'
            endIcon={<PhotoCamera />}
          >
            Upload Your Image
          </Button>
          <FileBase onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </label>
        <div className={classes.btnContainer}>
          <Button color='primary' variant='contained' type='submit'>
            Submit
          </Button>
          <Button color='secondary' variant='outlined' onClick={clearFields}>
            clear
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default FormCreatePost;
