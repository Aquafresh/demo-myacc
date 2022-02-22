import React from 'react';
import styled from 'styled-components';
import {CustomButton} from "../../components/Button/Button";

const Wrapper = styled.div`
  display: flex;
  margin-top: 40px;
`;

export const ThemeChanger = (props: any) => {

  const onClickThemeChanger = (value: string) => {
    props.onChange(value)

    // let root = document.documentElement;
    // if(value === 'Light') {
    //   root.style.setProperty('--main-bg-color2', '#FFDF20');
    // }
    // else if(value === 'Dark') {
    //   root.style.setProperty('--main-bg-color2', '#1EE7C9');
    //
    // }
    // else if(value === 'Orange') {
    //   root.style.setProperty('--main-bg-color2', '#FA8E00');
    //
    // }
    // else if(value === 'Blue') {
    //   root.style.setProperty('--main-bg-color2', '#2750FC');
    // }
  }

  return (
      <Wrapper>
        <CustomButton onClick={() => onClickThemeChanger('default')} name={'default'}/>
        <CustomButton onClick={() => onClickThemeChanger('LTdarkOrange')} name={'LTdarkOrange'}/>
        <CustomButton onClick={() => onClickThemeChanger('LTdark')} name={'LTdark'}/>
        <CustomButton onClick={() => onClickThemeChanger('LTlight')} name={'LTlight'}/>
      </Wrapper>
  )

}
