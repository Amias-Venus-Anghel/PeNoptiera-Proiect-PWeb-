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
import type { UserDTO } from './UserDTO';
import {
    UserDTOFromJSON,
    UserDTOFromJSONTyped,
    UserDTOToJSON,
} from './UserDTO';

/**
 * 
 * @export
 * @interface FormDTO
 */
export interface FormDTO {
    /**
     * 
     * @type {string}
     * @memberof FormDTO
     */
    id?: string;
    /**
     * 
     * @type {FormSubjectEnum}
     * @memberof FormDTO
     */
    subject?: FormSubjectEnum;
    /**
     * 
     * @type {string}
     * @memberof FormDTO
     */
    body?: string | null;
    /**
     * 
     * @type {number}
     * @memberof FormDTO
     */
    rating?: number;
    /**
     * 
     * @type {UserDTO}
     * @memberof FormDTO
     */
    user?: UserDTO;
    /**
     * 
     * @type {Date}
     * @memberof FormDTO
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof FormDTO
     */
    updatedAt?: Date;
}

/**
 * Check if a given object implements the FormDTO interface.
 */
export function instanceOfFormDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FormDTOFromJSON(json: any): FormDTO {
    return FormDTOFromJSONTyped(json, false);
}

export function FormDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): FormDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'subject': !exists(json, 'subject') ? undefined : FormSubjectEnumFromJSON(json['subject']),
        'body': !exists(json, 'body') ? undefined : json['body'],
        'rating': !exists(json, 'rating') ? undefined : json['rating'],
        'user': !exists(json, 'user') ? undefined : UserDTOFromJSON(json['user']),
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
    };
}

export function FormDTOToJSON(value?: FormDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'subject': FormSubjectEnumToJSON(value.subject),
        'body': value.body,
        'rating': value.rating,
        'user': UserDTOToJSON(value.user),
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
    };
}
