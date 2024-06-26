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
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';
import type { FormDTOPagedResponse } from './FormDTOPagedResponse';
import {
    FormDTOPagedResponseFromJSON,
    FormDTOPagedResponseFromJSONTyped,
    FormDTOPagedResponseToJSON,
} from './FormDTOPagedResponse';

/**
 * 
 * @export
 * @interface FormDTOPagedResponseRequestResponse
 */
export interface FormDTOPagedResponseRequestResponse {
    /**
     * 
     * @type {FormDTOPagedResponse}
     * @memberof FormDTOPagedResponseRequestResponse
     */
    response?: FormDTOPagedResponse;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof FormDTOPagedResponseRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the FormDTOPagedResponseRequestResponse interface.
 */
export function instanceOfFormDTOPagedResponseRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FormDTOPagedResponseRequestResponseFromJSON(json: any): FormDTOPagedResponseRequestResponse {
    return FormDTOPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function FormDTOPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): FormDTOPagedResponseRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : FormDTOPagedResponseFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function FormDTOPagedResponseRequestResponseToJSON(value?: FormDTOPagedResponseRequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': FormDTOPagedResponseToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

