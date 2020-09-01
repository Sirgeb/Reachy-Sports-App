import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  skeleton: {
    height: 40,
    marginBottom: 5
  }
});

const TableSkeleton = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton className={classes.skeleton} />
      <Skeleton className={classes.skeleton} />
      <Skeleton className={classes.skeleton} />
      <Skeleton className={classes.skeleton} />
      <Skeleton className={classes.skeleton} />
      <Skeleton className={classes.skeleton} />
      <Skeleton className={classes.skeleton} />
    </div>
  );
}

export default TableSkeleton;
