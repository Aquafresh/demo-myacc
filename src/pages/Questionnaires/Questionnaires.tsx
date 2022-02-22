import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import styled from 'styled-components';

import {useGetQuestionnairesFormScheme} from "./hooks/get-questionnaires-form-scheme.effect";
import {Group} from "../../components/Group/Group";
import {usePostQuestionnairesFormScheme} from "./hooks/post-questionnaires-form-scheme.effect";
import {CustomButton} from "../../components/Button/Button";
import Typography from "@mui/material/Typography";
import {ThemeChanger} from "../../containers/ThemeChanger/ThemeChanger";
import {useGetTheme} from "./hooks/get-theme.effect";
import {useGetQuestionnairesFormSchemeHook} from "./hooks/get-questionnaires-form.hook";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const FormWrapper = styled.div`
  width: 70vw;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  margin: 0 auto;
  padding: 30px;
  background: var(--main-main);
  color: var(--main-mainWhiteText);
`

export const QuestionnairesPage = () => {

  const getFormSchemeState = useGetQuestionnairesFormScheme()
  const postFormSchemeState = usePostQuestionnairesFormScheme()
  const getThemeState = useGetTheme()

  const {register, handleSubmit, formState: {errors}} = useForm();

  const [selectedTheme, setSelectedTheme] = useState<string>('default');

  useEffect(() => {
    getFormSchemeState.getFormScheme()


    getThemeState.getThemeByName('default');
  }, []);


  useEffect(() => {
    if(selectedTheme === 'default') return
    getThemeState.getThemeByName(selectedTheme);
  }, [selectedTheme])

  useEffect(() => {
    if(!getThemeState.data) return;

    console.log('getThemeState', getThemeState)

    let root = document.documentElement;
    root.style.setProperty('--main-main', getThemeState.data.main);
    root.style.setProperty('--main-main-dark', getThemeState.data.mainDark);
    root.style.setProperty('--main-main-light', getThemeState.data.mainLight);
    root.style.setProperty('--main-main-greyText', getThemeState.data.mainGreyText);
    root.style.setProperty('--main-mainOrange', getThemeState.data.mainOrange);
    root.style.setProperty('--main-mainWhiteText', getThemeState.data.mainWhiteText);

  }, [getThemeState.data])

  const onSubmit = (data) => {
    postFormSchemeState.postFormScheme(data)
  }

  const onChangeTheme = (name: string) => {
    setSelectedTheme(name)
  }


  const state = useGetQuestionnairesFormSchemeHook()

  console.log('data',state)


  return (
      <FormWrapper>

        <Typography variant="h5" gutterBottom component="div">
          Economic Profile
        </Typography>


        {state.isLoading && <Box sx={{width: '100%'}}>
          <LinearProgress/>
        </Box>}

        <form onSubmit={handleSubmit(onSubmit)}>

          {!!state.data && state.data.groups.map((item) => {
            return <Group data={item} reg={register} errors={errors}/>
          })}

          <CustomButton name={'Submit'}/>
        </form>

        <ThemeChanger onChange={onChangeTheme}/>
        {selectedTheme}
      </FormWrapper>
  )
}
