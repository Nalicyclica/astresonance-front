type ResponseResultInfo = {
  valid: boolean
  action: string
  errors: any
};

export type ResponseInfo = {
  loading: boolean
  result: ResponseResultInfo
};

export type IdResponseInfo = ResponseInfo & {
  id: number
};

const defaultResponseResult: ResponseResultInfo = {
  valid: false,
  action: "",
  errors: null
};

export const defaultResponse: ResponseInfo = {
  loading: false,
  result: {...defaultResponseResult}
};

export const defaultIdResponse: IdResponseInfo = {
  ...defaultResponse,
  id: -1
};

export const loadingResponse: ResponseInfo = {
  loading: true,
  result: {...defaultResponseResult}
};

export const successResponse = (action: string = "requested"): ResponseInfo => {
  const successResponseData: ResponseInfo = {
    loading: false,
    result: {
      valid: true,
      action: action,
      errors: null
    }
  };
  return successResponseData;
};

export const errorResponse = (errors: any, action: string = "requested"): ResponseInfo => {
  const errorResponseData: ResponseInfo = {
    loading: false,
    result: {
      valid: false,
      action: action,
      errors: errors
    }
  };
  return errorResponseData;
};