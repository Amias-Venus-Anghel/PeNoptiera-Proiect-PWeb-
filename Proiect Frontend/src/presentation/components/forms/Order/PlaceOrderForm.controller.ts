import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOrderApi, useUserApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { OrderDeliveryEnum, OrderStatusEnum} from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { OrderUpdateFormModel } from "./OrderUpdateForm.type";
import { PlaceOrderFormController, PlaceOrderFormModel } from "./PlaceOrderForm.type";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
import { toast } from "react-toastify";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: PlaceOrderFormModel) => {
    const defaultValues = {
        deliveryAddress: "",
        deliveryMethod: "" as OrderDeliveryEnum
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
const useInitPlaceOrderForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
            deliveryAddress: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.address",
                    }),
                }))
            .default(defaultValues.deliveryMethod),

        deliveryMethod: yup.string()
            .oneOf([ // The select input should have one of these values.
               OrderDeliveryEnum.Courier,
               OrderDeliveryEnum.Post
            ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.deliverymethod",
                    }),
                }))
            .default(defaultValues.deliveryMethod)
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const usePlaceOrderFormController = (onSubmit?: () => void): PlaceOrderFormController => {
    const { defaultValues, resolver } = useInitPlaceOrderForm();
    const { placeOrder: { mutation, key: mutationKey }, getOrders: { key: queryKey } } = useOrderApi();
    const { mutateAsync: placeOrder, status } = useMutation({
        mutationKey: [mutationKey], 
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    const { redirectToHome } = useAppRouter();
    const { formatMessage } = useIntl();
    
    const submit = useCallback((data: PlaceOrderFormModel) => // Create a submit callback to send the form data to the backend.
        placeOrder(data).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] }); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.
            toast(formatMessage({ id: "notifications.messages.orderPlacedSuccess" }));
            redirectToHome();
            
            if (onSubmit) {
                onSubmit();
            }
        }), [placeOrder, queryClient, queryKey]);

    

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

    const selectDelivery = useCallback((event: SelectChangeEvent<OrderDeliveryEnum>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue( "deliveryMethod" , event.target.value as OrderDeliveryEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectDelivery
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