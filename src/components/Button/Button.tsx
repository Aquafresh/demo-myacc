import React from "react";
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    background: `var(--main-mainOrange) !important`,
    margin: '10px 10px 10px 0'
  },
}) as any;

export const CustomButton = (props: any) => {
  const classes = useStyles();

  return <Button onClick={props.onClick} type="submit" variant="contained" className={classes.root}>{props.name}</Button>
}
