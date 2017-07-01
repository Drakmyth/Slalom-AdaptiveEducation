class SemanticRolesModel {
    sentence: string;
    subject: string;
    action: string;
    object: string;
    

    constructor (sentence: string, subject: string, action: string, object: string) {
        this.sentence = sentence;
        this.subject = subject;
        this.action = action;
        this.object = object;        
    }

    printOut() {
        return "Hello, " + this.sentence;
    }
}