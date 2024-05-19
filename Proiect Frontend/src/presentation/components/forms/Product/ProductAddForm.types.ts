import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { ProductTypeEnum } from "@infrastructure/apis/client";

export type ProductAddFormModel = {
    name: string;
    description: string;
    price: number;
    productType: ProductTypeEnum;
};

export type ProductAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<ProductAddFormModel>>;
};

export type ProductAddFormActions = {
    register: UseFormRegister<ProductAddFormModel>;
    watch: UseFormWatch<ProductAddFormModel>;
    handleSubmit: UseFormHandleSubmit<ProductAddFormModel>;
    submit: (body: ProductAddFormModel) => void;
    selectType: (value: SelectChangeEvent<ProductTypeEnum>) => void;
};
export type ProductAddFormComputed = {
    defaultValues: ProductAddFormModel,
    isSubmitting: boolean
};

export type ProductAddFormController = FormController<ProductAddFormState, ProductAddFormActions, ProductAddFormComputed>;
