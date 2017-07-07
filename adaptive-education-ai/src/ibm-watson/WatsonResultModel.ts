'use strict';

import SemanticRolesModel from '../ibm-watson/SemanticRolesModel';

export default class WatsonResultModel {
    semanticRoles: SemanticRolesModel[];
    language: string;

    constructor(
        semanticRoles: SemanticRolesModel[], 
        language: string) {
            this.semanticRoles = semanticRoles;
            this.language = language;
    }   
}