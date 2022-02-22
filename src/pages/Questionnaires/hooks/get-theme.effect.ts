import Axios from 'axios';
import {useState} from 'react';
import {getTheme} from "../../../api/Theme/get-theme";

export const useGetTheme = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  const getThemeByName = async (name) => {

    try {
      const resData = await getTheme(name);

      setData(resData)
    } catch (e) {
      if (e instanceof Axios.Cancel) {
      } else {
        setError('Unable to fetch utility list');
      }
    }
  };

  return {getThemeByName, data, error};
};
