import React from 'react';
import {Field} from "../Field/Field";
import {getQuestionType} from "./utls";
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import {makeStyles} from "@mui/styles";
import styled from "styled-components";

const useTypographyStyles = makeStyles({
  root: {
    color: 'var(--main-mainOrange)'
  }
})

const GroupWrapper = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #4f5254;
`;

export const Group = (data: any) => {

  const typographyClasses = useTypographyStyles();


  return <GroupWrapper className="group">
    <Typography variant="h6" gutterBottom component="div" className={typographyClasses.root}>
      {data.data.name}
    </Typography>
    {!!data.data && data.data.subGroups.map((item: any) => {
      return item.questions.map((question: any) => {
        const type = getQuestionType(question);

        return <div>

          <Typography variant="body1" gutterBottom component="div">
            {question.questionText}
          </Typography>

          <Field data={question} type={type} reg={data.reg}/>

          {data.errors[question.questionId]?.type === 'required' &&
          <Alert severity="error">This field is required</Alert>}
        </div>
      })
    })}
  </GroupWrapper>
}
