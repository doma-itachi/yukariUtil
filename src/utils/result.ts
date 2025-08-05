type ResultSuccess<T> = T extends void ? {success: true} : {success: true, data: T};
type ResultFailure<E> = {success: false, error: E};

/**
 * Result型
 */
export type Result<ReturnType, ErrorType> = ResultSuccess<ReturnType> | ResultFailure<ErrorType>;