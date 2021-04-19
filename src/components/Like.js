import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { ThumbUpAltOutlined, ThumbUpAlt } from '@material-ui/icons';

const useStyles = makeStyles(() => {
  return {
    likeContainer: {
      display: 'flex',
      alignItems: 'center',
    },
  };
});
const Like = ({ post, userId, onClick }) => {
  const classes = useStyles();
  const currentUserLiked = post.likes.find((like) => like === userId);
  const text =
    post.likes.length > 0
      ? currentUserLiked
        ? post.likes.length > 2
          ? `You and ${post.likes.length - 1} others`
          : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`
        : `${post.likes.length} ${post.likes.length === 1 ? 'Like' : 'Likes'}`
      : ' Like';
  const button =
    post.likes.length > 0 ? (
      currentUserLiked ? (
        <ThumbUpAlt />
      ) : (
        <ThumbUpAltOutlined />
      )
    ) : (
      <ThumbUpAltOutlined />
    );
  return (
    <div className={classes.likeContainer}>
      <IconButton color={userId && 'primary'} disabled={!userId} onClick={onClick}>
        {button}
      </IconButton>
      <Typography color={userId ? 'primary' : 'textSecondary'}>{text}</Typography>
    </div>
  );
};

export default Like;
