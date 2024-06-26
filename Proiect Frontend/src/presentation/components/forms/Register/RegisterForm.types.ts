import { UserRoleEnum } from "@infrastructure/apis/client";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type RegisterFormModel = {
    name: string;
    email: string;
    password: string;
    role: UserRoleEnum;
};

export type RegisterFormState = {
    errors: FieldErrorsImpl<DeepRequired<RegisterFormModel>>;
};

export type UserAddFormActions = {
    register: UseFormRegister<RegisterFormModel>;
    watch: UseFormWatch<RegisterFormModel>;
    handleSubmit: UseFormHandleSubmit<RegisterFormModel>;
    submit: (body: RegisterFormModel) => void;
    selectRole: (value: SelectChangeEvent<UserRoleEnum>) => void;
    setPassConfirm: (value: string) => void; 
};
export type UserAddFormComputed = {
    defaultValues: RegisterFormModel,
    isSubmitting: boolean
};

export type RegisterFormController = FormController<RegisterFormState, UserAddFormActions, UserAddFormComputed>;