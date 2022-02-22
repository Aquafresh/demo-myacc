import Axios from 'axios';
import {useState} from 'react';
import {postQuestionnairesFormScheme} from "../../../api/Questionnaires/post-questionnaires-form-scheme";

export const usePostQuestionnairesFormScheme = () => {
  const [error, setError] = useState('');


  const postFormScheme = async (payload: any) => {
    const dataMapped = dataMapping(payload)

    try {
      await postQuestionnairesFormScheme(dataMapped);
    } catch (e) {
      if (e instanceof Axios.Cancel) {
      } else {
        setError('Unable to fetch utility list');
      }
    }
  };

  return {postFormScheme, error};
};

const dataMapping = (payload: any) => {
  let result = [] as any

  Object.keys(payload).forEach((item, ) => {

    if (Array.isArray(payload[item])) {
      payload[item].forEach((elem) => {
        result.push({
          questionId: +item,
          answerId: +elem,
        })
      })
    } else {
      result.push({
        questionId: +item,
        answerId: +payload[item],
      })
    }
  })

  return result
}
