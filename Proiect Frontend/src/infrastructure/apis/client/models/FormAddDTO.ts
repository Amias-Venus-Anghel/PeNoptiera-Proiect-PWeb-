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

import { exists, mapValues } from '../runtime';
import type { FormSubjectEnum } from './FormSubjectEnum';
import {
    FormSubjectEnumFromJSON,
    FormSubjectEnumFromJSONTyped,
    FormSubjectEnumToJSON,
} from './FormSubjectEnum';

/**
 * 
 * @export
 * @interface FormAddDTO
 */
export interface FormAddDTO {
    /**
     * 
     * @type {FormSubjectEnum}
     * @memberof FormAddDTO
     */
    subject?: FormSubjectEnum;
    /**
     * 
     * @type {string}
     * @memberof FormAddDTO
     */
    body?: string | null;
    /**
     * 
     * @type {number}
     * @memberof FormAddDTO
     */
    rating?: number;
}

/**
 * Check if a given object implements the FormAddDTO interface.
 */
export function instanceOfFormAddDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FormAddDTOFromJSON(json: any): FormAddDTO {
    return FormAddDTOFromJSONTyped(json, false);
}

export function FormAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): FormAddDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'subject': !exists(json, 'subject') ? undefined : FormSubjectEnumFromJSON(json['subject']),
        'body': !exists(json, 'body') ? undefined : json['body'],
        'rating': !exists(json, 'rating') ? undefined : json['rating'],
    };
}

export function FormAddDTOToJSON(value?: FormAddDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'subject': FormSubjectEnumToJSON(value.subject),
        'body': value.body,
        'rating': value.rating,
    };
}
