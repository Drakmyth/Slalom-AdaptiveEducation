'use strict';

export class SemanticRolesModel {
    sentence: string;
    subject: subjectModel;
    action: actionModel;
    object: objectModel;
}

export class subjectModel {
    text: string;
}

export class actionModel {
    text: string;
    normalized: string;
}

export class objectModel {
    text: string;
}

export default SemanticRolesModel;