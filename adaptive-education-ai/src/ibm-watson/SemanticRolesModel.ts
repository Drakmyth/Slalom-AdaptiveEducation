'use strict';

export default class SemanticRolesModel {
    sentence: string;
    subject: SubjectModel;
    action: ActionModel;
    object: ObjectModel;
}

export class SubjectModel {
    text: string;
}

export class ActionModel {
    text: string;
    normalized: string;
}

export class ObjectModel {
    text: string;
}