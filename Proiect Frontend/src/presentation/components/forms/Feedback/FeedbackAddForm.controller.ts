import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFbFormApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { FormSubjectEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { FeedbackAddFormController, FeedbackAddFormModel } from "./FeedbackAddForm.type";
import { useAppDispatch } from "@application/store";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
import { toast } from "react-toastify";
/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: FeedbackAddFormModel) => {
    const defaultValues = {
        subject: "" as FormSubjectEnum,
        body: "",
        rating: 0
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
const useInitFeedbackAddForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        subject: yup.string()
            .oneOf([ // The select input should have one of these values.
                    FormSubjectEnum.Account,
                    FormSubjectEnum.Delivery,
                    FormSubjectEnum.Other,
                    FormSubjectEnum.Payment,
                    FormSubjectEnum.Products
                ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.subject",
                    }),
                }))
            .default(defaultValues.subject),
        body: yup.string() // optional
            .default(defaultValues.body),
        rating: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "global.rating",
                    }),
                }))
                .default(defaultValues.rating),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */

export const useFeedbackAddFormController = (onSubmit?: () => void): FeedbackAddFormController => {
    const { defaultValues, resolver } = useInitFeedbackAddForm();
    const { addFbForm: { mutation, key: mutationKey }, getFbForm: { key: queryKey } } = useFbFormApi();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [mutationKey], 
        mutationFn: mutation
    });

    const { redirectToHome } = useAppRouter();
    const { formatMessage } = useIntl();

    const queryClient = useQueryClient();
    const submit = useCallback((data: FeedbackAddFormModel) => // Create a submit callback to send the form data to the backend.
        add(data).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] }); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            toast(formatMessage({ id: "notifications.errors.feedbackSentSuccess"}));
            redirectToHome();

            if (onSubmit) {
                onSubmit();
            }
        }), [add, queryClient, queryKey]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<FeedbackAddFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    const selectType = useCallback((event: SelectChangeEvent<FormSubjectEnum>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("subject", event.target.value as FormSubjectEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    const setRating = useCallback((value: number) => { 
        setValue("rating", value, {
            shouldValidate: true,
        });
    }, [setValue]);

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectSubject: selectType,
            setRating: setRating
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