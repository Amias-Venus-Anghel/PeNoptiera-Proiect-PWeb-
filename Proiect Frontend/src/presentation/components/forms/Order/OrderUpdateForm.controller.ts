import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOrderApi, useUserApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { OrderStatusEnum} from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { OrderUpdateFormController, OrderUpdateFormModel } from "./OrderUpdateForm.type";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (orderId: string, initialData?: OrderUpdateFormModel) => {
    const defaultValues = {
        id: orderId,
        status: OrderStatusEnum.Registered
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
const useInitOrderUpdateForm = (orderId: string) => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues(orderId);

    const schema = yup.object().shape({
        id: yup.string().default(defaultValues.id),

        status: yup.string()
            .oneOf([ // The select input should have one of these values.
                OrderStatusEnum.Registered,
                OrderStatusEnum.InTranzit,
                OrderStatusEnum.Delivered
            ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.status",
                    }),
                }))
            .default(defaultValues.status)
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useOrderUpdateFormController = (orderId: string, onSubmit?: () => void): OrderUpdateFormController => {
    const { defaultValues, resolver } = useInitOrderUpdateForm(orderId);
    const { updateOrder: { mutation, key: mutationKey }, getOrders: { key: queryKey } } = useOrderApi();
    const { mutateAsync: update, status } = useMutation({
        mutationKey: [mutationKey], 
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    
    const submit = useCallback((data: OrderUpdateFormModel) => // Create a submit callback to send the form data to the backend.
        update(data).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] }); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.

            if (onSubmit) {
                onSubmit();
            }
        }), [update, queryClient, queryKey]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<OrderUpdateFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    const selectStatus = useCallback((event: SelectChangeEvent<OrderStatusEnum>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("status", event.target.value as OrderStatusEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectStatus
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