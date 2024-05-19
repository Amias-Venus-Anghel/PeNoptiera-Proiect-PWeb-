import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOrderApi, useProductApi, useUserApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { OrderStatusEnum, ProductDTO, ProductTypeEnum} from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { ProductUpdateFormController, ProductUpdateFormModel } from "./ProductUpdateForm.types";

/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (product: ProductDTO, initialData?: ProductUpdateFormModel) => {
    const defaultValues = {
        id: product.id as string,
        name: product.name as string,
        description: product.description as string,
        price: product.price as number,
        productType: product.productType as ProductTypeEnum
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
const useInitProductUpdateForm = (product: ProductDTO) => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues(product);

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
        description: yup.string() // optional
            .default(defaultValues.description),
        price: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.price",
                    }),
                }))
                .default(defaultValues.price),
        productType: yup.string()
            .oneOf([ // The select input should have one of these values.
                ProductTypeEnum.BoardGame,
                ProductTypeEnum.Book,
                ProductTypeEnum.Puzzle
            ])
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.type",
                    }),
                }))
            .default(defaultValues.productType)
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useProductUpdateFormController = (product: ProductDTO, onSubmit?: () => void): ProductUpdateFormController => {
    
    const { defaultValues, resolver } = useInitProductUpdateForm(product);
    const { updateProduct: { mutation, key: mutationKey }, getProductsOfUser: { key: queryKey } } = useProductApi();
    const { mutateAsync: update, status } = useMutation({
        mutationKey: [mutationKey], 
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    
    const submit = useCallback((data: ProductUpdateFormModel) => // Create a submit callback to send the form data to the backend.
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
    } = useForm<ProductUpdateFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });

    const selectType = useCallback((event: SelectChangeEvent<ProductTypeEnum>) => { // Select inputs are tricky and may need their on callbacks to set the values.
        setValue("productType", event.target.value as ProductTypeEnum, {
            shouldValidate: true,
        });
    }, [setValue]);

    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
            selectType
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