import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { FormSubjectEnum } from "@infrastructure/apis/client";

export type FeedbackAddFormModel = {
    subject: FormSubjectEnum;
    body: string;
    rating: number;
};

export type FeedbackAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<FeedbackAddFormModel>>;
};

export type FeedbackAddFormActions = {
    register: UseFormRegister<FeedbackAddFormModel>;
    watch: UseFormWatch<FeedbackAddFormModel>;
    handleSubmit: UseFormHandleSubmit<FeedbackAddFormModel>;
    submit: (body: FeedbackAddFormModel) => void;
    selectSubject: (value: SelectChangeEvent<FormSubjectEnum>) => void;
    setRating: (value: number) => void; 
};
export type FeedbackAddFormComputed = {
    defaultValues: FeedbackAddFormModel,
    isSubmitting: boolean
};

export type FeedbackAddFormController = FormController<FeedbackAddFormState, FeedbackAddFormActions, FeedbackAddFormComputed>;
