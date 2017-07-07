export class ServiceResponseWrapper<T> {
    isFinished: boolean;
    content: T;

    constructor(isFinished: boolean, content: T){
        this.isFinished = isFinished;
        this.content = content;
    }
}