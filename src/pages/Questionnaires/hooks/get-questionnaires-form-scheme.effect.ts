import Axios from 'axios';
import { useState } from 'react';
import {getQuestionnairesFormScheme} from "../../../api/Questionnaires/get-questionnaires-form-scheme";

export const useGetQuestionnairesFormScheme = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');


  const getFormScheme = async () => {

    try {
      const resData = await getQuestionnairesFormScheme();
      setData(resData)

    } catch (e) {
      if (e instanceof Axios.Cancel) {
      } else {
        setError('Unable to fetch utility list');
      }
    }
  };

  return { getFormScheme,data,error  };
};
