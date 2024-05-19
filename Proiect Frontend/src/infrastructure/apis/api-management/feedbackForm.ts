import { useAppSelector } from "@application/store";
import { ApiProductGetPageGetRequest, ProductAddDTO, ProductUpdateDTO, ProductApi, ApiFormGetPageGetRequest, FormApi, FormDTO, FormAddDTO} from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getFbFormsQueryKey = "getFbFormsQuery";
const getFbFormQueryKey = "getFbFormQuery";
const addFbFormMutationKey = "addFbFormMutation";
const deleteFbFormMutationKey = "deleteFbFormMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useFbFormApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getFbForms = (page: ApiFormGetPageGetRequest) => new FormApi(config).apiFormGetPageGet(page); // Use the generated client code and adapt it.
    const getFbForm = (id: string) => new FormApi(config).apiFormGetByIdIdGet({ id });
    const addFbForm = (form: FormAddDTO) => new FormApi(config).apiFormAddPost({ formAddDTO: form });
    const deleteFbForm = (id: string) => new FormApi(config).apiFormDeleteIdDelete({ id });
    
    return {
        getFbForms: { // Return the query object.
            key: getFbFormsQueryKey, // Add the key to identify the query.
            query: getFbForms // Add the query callback.
        },
        getFbForm: {
            key: getFbFormQueryKey,
            query: getFbForm
        },
        addFbForm: { // Return the mutation object.
            key: addFbFormMutationKey, // Add the key to identify the mutation.
            mutation: addFbForm // Add the mutation callback.
        },
        deleteFbForm: {
            key: deleteFbFormMutationKey,
            mutation: deleteFbForm
        }
    }
}