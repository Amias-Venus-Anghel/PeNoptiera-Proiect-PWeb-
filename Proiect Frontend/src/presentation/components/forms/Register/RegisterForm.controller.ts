import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLoginApi, useUserApi } from "@infrastructure/apis/api-management";
import { useCallback, useState } from "react";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { RegisterFormController, RegisterFormModel } from "./RegisterForm.types";
import { setToken } from "@application/state-slices";
import { useAppDispatch } from "@application/store";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
import { toast } from "react-toastify";
import { LoginFormModel } from "../Login/LoginForm.types";


/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: RegisterFormModel) => {
    const defaultValues = {
        email: "",
        name: "",
        password: "",
        role: "" as UserRoleEnum
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

/**
 * Create a hook to get the validation schema.
 */
const useInitRegisterForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        name: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.name",
                    }),
                }))
            .default(defaultValues.name),
        email: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.email",
                    }),
                }))
            .email()
            .default(defaultValues.email),
        password: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.password",
                    }),
                })),
        role: yup.string()
            .oneOf([ // The select input should have one of these values.
                UserRoleEnum.Admin,
                UserRoleEnum.Producer,
                UserRoleEnum.Client
            ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.role",
                    }),
                }))
            .default(defaultValues.role)
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useRegisterFormController = (onSubmit?: () => void): RegisterFormController => {
    const { formatMessage } = useIntl();

    const { defaultValues, resolver } = useInitRegisterForm();

    const { addUser: { mutation, key: mutationKey }, getUsers: { key: queryKey } } = useUserApi();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [mutationKey], 
        mutationFn: mutation
    });

    const [passConfirm, setPassConfirm] = useState<string>("");

    const queryClient = useQueryClient();

    const dispatch = useAppDispatch();
    const { redirectToHome } = useAppRouter();
    const { loginMutation: { mutation: loginMutation } } = useLoginApi();
    const login = useCallback((data: LoginFormModel) => {
        return loginMutation(data).then((result) => {
            dispatch(setToken(result.response?.token ?? ''));
            toast(formatMessage({ id: "notifications.messages.authenticationSuccess" }));
            redirectToHome();
        });
    }, [loginMutation, dispatch, redirectToHome, formatMessage]);

    const submit = useCallback((data: RegisterFormModel ) => // Create a submit callback to send the form data to the backend.
        data.password == passConfirm ? 
        add(data).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] }); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            
            login({ email: data.email, password: data.password });

            if (onSubmit) {
                onSubmit();
            }
        }) : 
        toast(formatMessage({ id: "notifications.messages.passworddontmatch" }))
        , [add, queryClient, queryKey, login, onSubmit]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<RegisterFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    const selectRole = useCallback((event: SelectChangeEvent<UserRoleEnum>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("role", event.target.value as UserRoleEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectRole,
            setPassConfirm
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending" // Return if the form is still submitting or nit.
        },
        state: {
            errors // Return what errors have occurred when validating the form input.
        }
    }
}