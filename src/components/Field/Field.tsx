import React, {useMemo} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import {makeStyles} from "@mui/styles";
import {Typography} from "@mui/material";
import styled from "styled-components";

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const useSelectStyles = makeStyles({
  selected: {},
  rootMenuItem: {
    "&$selected": {
      backgroundColor: "red",
      "&:hover": {
        backgroundColor: "green"
      }
    },
    '&:hover': {
      backgroundColor: 'blue'
    },
    backgroundColor: 'var(--main-main-light)'
  },
  root: {
    border: `none`,
    width: '530px',
    height: '55px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '3px',
    background: 'var(--main-main-light)',
    color: '#ffffff',


    "&:focus": {
      outline: 'var(--main-mainOrange) !important',
    },
  },
}) as any;

const useCheckboxStyles = makeStyles({
  root: {
    color: 'var(--main-main-light)',
    width: '24px',
    height: '24px',

    svg: {
      fontSize: '24px !important',
    },

    '&.Mui-checked': {
      color: 'var(--main-mainOrange) !important',
    }
  }

}) as any;

const useRadioStyles = makeStyles({
  root: {
    color: 'var(--main-main-light)',

    svg: {
      fontSize: '24px !important',
    },

    '&.Mui-checked': {
      color: 'var(--main-mainOrange) !important',
    }
  }

}) as any;

export const Field = ({data, type, reg}): any => {

  const selectClasses = useSelectStyles();
  const checkboxClasses = useCheckboxStyles();
  const radioClasses = useRadioStyles();

  if (type === 'select') {
    const options = useMemo(() => {
      return data.answers.map(({answerId, answerText}) => <MenuItem
          classes={{selected: selectClasses.selected, root: selectClasses.rootMenuItem}}
          value={answerId}>{answerText}</MenuItem>)
    }, [data]);
    return <FormControl fullWidth>
      <Select
          className={selectClasses.root}
          defaultValue={data.answers[0].answerId}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...reg(`${data.questionId}`, {required: true})}
      >
        {options}
      </Select>
    </FormControl>
  }

  if (type === 'radio') {
    const elems = useMemo(() => {
      return data.answers.map(({answerId, answerText}) => <FormControlLabel value={answerText} control={
        <Radio className={radioClasses.root} {...reg(`${data.questionId}`, {required: true})} value={answerId}/>}
                                                                            label={answerText}/>)
    }, [data]);
    return <RadioGroup
        className='test'
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
    >
      {elems}
    </RadioGroup>
  }

  if (type === 'checkbox') {
    const elems = useMemo(() => {
      return data.answers.map(({answerId, answerText}) => <>
        <Checkbox {...reg(`${data.questionId}`, {required: true})} value={answerId}
                  className={checkboxClasses.root}/>
        <Typography variant="body1" gutterBottom component="div">{answerText}</Typography>

      </>)
    }, [data]);
    return <CheckboxWrapper>{elems}</CheckboxWrapper>

  }

  if (type === 'specify') {
    return <input type="text" {...reg(`${data.questionId}`, {required: true})} />
  }
}
