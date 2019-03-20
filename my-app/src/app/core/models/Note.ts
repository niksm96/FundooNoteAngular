import { Label } from './Label';
import { Collaborator } from './Collaborator';

export interface Note {
    title: string;
    description: string;
    archive:boolean;
    trashed:boolean;
    pinned:boolean;
    listOfLabels : Label[];
    color : string;
    collaboratedUsers:Collaborator[];
    reminder:string;
}