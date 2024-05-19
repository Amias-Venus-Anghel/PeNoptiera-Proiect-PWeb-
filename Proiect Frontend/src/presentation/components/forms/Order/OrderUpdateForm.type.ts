import { OrderStatusEnum, UserRoleEnum } from "@infrastructure/apis/client";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type OrderUpdateFormModel = {
    id: string
    status: OrderStatusEnum
};

export type OrderUpdateFormState = {
    errors: FieldErrorsImpl<DeepRequired<OrderUpdateFormModel>>;
};

export type OrderUpdateFormActions = {
    register: UseFormRegister<OrderUpdateFormModel>;
    watch: UseFormWatch<OrderUpdateFormModel>;
    handleSubmit: UseFormHandleSubmit<OrderUpdateFormModel>;
    submit: (body: OrderUpdateFormModel) => void;
    selectStatus: (value: SelectChangeEvent<OrderStatusEnum>) => void;
};
export type OrderUpdateFormComputed = {
    defaultValues: OrderUpdateFormModel,
    isSubmitting: boolean
};

export type OrderUpdateFormController = FormController<OrderUpdateFormState, OrderUpdateFormActions, OrderUpdateFormComputed>;