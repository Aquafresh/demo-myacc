import {useQuery} from "react-query";
import {getQuestionnairesFormScheme} from "../../../api/Questionnaires/get-questionnaires-form-scheme";

export const useGetQuestionnairesFormSchemeHook = () => useQuery("repoData", getQuestionnairesFormScheme);
