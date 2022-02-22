import axios from 'axios';

const url = '/api/questionnaire/type/EconomicProfile'

export const postQuestionnairesFormScheme = async (payload: any): Promise<any> => {
  return axios.put(url, payload);
};
