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


import * as runtime from '../runtime';
import type {
  ProductAddDTO,
  ProductDTOPagedResponseRequestResponse,
  ProductDTORequestResponse,
  ProductUpdateDTO,
  RequestResponse,
} from '../models';
import {
    ProductAddDTOFromJSON,
    ProductAddDTOToJSON,
    ProductDTOPagedResponseRequestResponseFromJSON,
    ProductDTOPagedResponseRequestResponseToJSON,
    ProductDTORequestResponseFromJSON,
    ProductDTORequestResponseToJSON,
    ProductUpdateDTOFromJSON,
    ProductUpdateDTOToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
} from '../models';

export interface ApiProductAddPostRequest {
    productAddDTO?: ProductAddDTO;
}

export interface ApiProductDeleteIdDeleteRequest {
    id: string;
}

export interface ApiProductGetByIdIdGetRequest {
    id: string;
}

export interface ApiProductGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiProductGetProductsOfUserGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiProductUpdatePutRequest {
    productUpdateDTO?: ProductUpdateDTO;
}

/**
 * 
 */
export class ProductApi extends runtime.BaseAPI {

    /**
     */
    async apiProductAddPostRaw(requestParameters: ApiProductAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Product/Add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ProductAddDTOToJSON(requestParameters.productAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiProductAddPost(requestParameters: ApiProductAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiProductAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiProductDeleteIdDeleteRaw(requestParameters: ApiProductDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiProductDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Product/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiProductDeleteIdDelete(requestParameters: ApiProductDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiProductDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiProductGetByIdIdGetRaw(requestParameters: ApiProductGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProductDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiProductGetByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Product/GetById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProductDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiProductGetByIdIdGet(requestParameters: ApiProductGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProductDTORequestResponse> {
        const response = await this.apiProductGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiProductGetPageGetRaw(requestParameters: ApiProductGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProductDTOPagedResponseRequestResponse>> {
        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['Search'] = requestParameters.search;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Product/GetPage`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProductDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiProductGetPageGet(requestParameters: ApiProductGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProductDTOPagedResponseRequestResponse> {
        const response = await this.apiProductGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiProductGetProductsOfUserGetRaw(requestParameters: ApiProductGetProductsOfUserGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProductDTOPagedResponseRequestResponse>> {
        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['Search'] = requestParameters.search;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Product/GetProductsOfUser`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProductDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiProductGetProductsOfUserGet(requestParameters: ApiProductGetProductsOfUserGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProductDTOPagedResponseRequestResponse> {
        const response = await this.apiProductGetProductsOfUserGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiProductUpdatePutRaw(requestParameters: ApiProductUpdatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Product/Update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ProductUpdateDTOToJSON(requestParameters.productUpdateDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiProductUpdatePut(requestParameters: ApiProductUpdatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiProductUpdatePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}