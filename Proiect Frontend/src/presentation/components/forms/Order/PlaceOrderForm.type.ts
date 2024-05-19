import { OrderDeliveryEnum } from "@infrastructure/apis/client";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type PlaceOrderFormModel = {
    deliveryAddress: string
    deliveryMethod: OrderDeliveryEnum
};

export type PlaceOrderFormState = {
    errors: FieldErrorsImpl<DeepRequired<PlaceOrderFormModel>>;
};

export type PlaceOrderFormActions = {
    register: UseFormRegister<PlaceOrderFormModel>;
    watch: UseFormWatch<PlaceOrderFormModel>;
    handleSubmit: UseFormHandleSubmit<PlaceOrderFormModel>;
    submit: (body: PlaceOrderFormModel) => void;
    selectDelivery: (value: SelectChangeEvent<OrderDeliveryEnum>) => void;
};
export type PlaceOrderFormComputed = {
    defaultValues: PlaceOrderFormModel,
    isSubmitting: boolean
};

export type PlaceOrderFormController = FormController<PlaceOrderFormState, PlaceOrderFormActions, PlaceOrderFormComputed>;