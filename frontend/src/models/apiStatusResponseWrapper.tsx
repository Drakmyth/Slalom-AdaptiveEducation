export interface IApiStatusResponseWrapper<T> {
    isFinished: boolean;
    content: T
}