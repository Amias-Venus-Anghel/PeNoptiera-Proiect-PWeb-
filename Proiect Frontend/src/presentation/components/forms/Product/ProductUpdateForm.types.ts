import { ProductTypeEnum } from "@infrastructure/apis/client";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type ProductUpdateFormModel = {
    id: string
    name: string;
    description: string;
    price: number;
    productType: ProductTypeEnum;
};

export type ProductUpdateFormState = {
    errors: FieldErrorsImpl<DeepRequired<ProductUpdateFormModel>>;
};

export type ProductUpdateFormActions = {
    register: UseFormRegister<ProductUpdateFormModel>;
    watch: UseFormWatch<ProductUpdateFormModel>;
    handleSubmit: UseFormHandleSubmit<ProductUpdateFormModel>;
    submit: (body: ProductUpdateFormModel) => void;
    selectType: (value: SelectChangeEvent<ProductTypeEnum>) => void;
};
export type ProductUpdateFormComputed = {
    defaultValues: ProductUpdateFormModel,
    isSubmitting: boolean
};

export type ProductUpdateFormController = FormController<ProductUpdateFormState, ProductUpdateFormActions, ProductUpdateFormComputed>;