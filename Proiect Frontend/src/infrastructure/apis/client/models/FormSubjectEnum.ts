/* tslint:disable */
/* eslint-disable */
/**
 * MobyLab Web App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 
 * @export
 */
export const FormSubjectEnum = {
    Other: 'Other',
    Payment: 'Payment',
    Delivery: 'Delivery',
    Products: 'Products',
    Account: 'Account'
} as const;
export type FormSubjectEnum = typeof FormSubjectEnum[keyof typeof FormSubjectEnum];


export function FormSubjectEnumFromJSON(json: any): FormSubjectEnum {
    return FormSubjectEnumFromJSONTyped(json, false);
}

export function FormSubjectEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): FormSubjectEnum {
    return json as FormSubjectEnum;
}

export function FormSubjectEnumToJSON(value?: FormSubjectEnum | null): any {
    return value as any;
}

