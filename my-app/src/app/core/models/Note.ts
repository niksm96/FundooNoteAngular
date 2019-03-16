import { Label } from './Label';

export interface Note {
    title: string;
    description: string;
    archive:boolean;
    trashed:boolean;
    pinned:boolean;
    listOfLabels : Label[];
    color : string;
}