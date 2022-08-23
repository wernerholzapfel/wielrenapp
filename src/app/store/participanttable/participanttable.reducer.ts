import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as participanttable from './participanttable.actions';
import {IParticipanttable} from '../../models/participanttable.model';
import {ITotaalStand} from '../../models/uitslagen.model';
import {gettourriderState, TourriderState} from '../tourriders/tourrider.reducer';

export interface ParticipanttableState {
    participanttable: ITotaalStand[];
    lastUpdated: any;
    inProgress: boolean;
    error: any;
}

const initalparticipanttableState: ParticipanttableState = {
    participanttable: [],
    lastUpdated: null,
    error: undefined,
    inProgress: false,
};

export function participanttableReducer(state = initalparticipanttableState, action): ParticipanttableState {
    switch (action.type) {
        case participanttable.FETCH_PARTICIPANTTABLE:
            return {
                ...state,
                inProgress: true,
            };
        case participanttable.FETCH_PARTICIPANTTABLE_SUCCESS:
            return {
                ...state,
                participanttable: action.payload,
                inProgress: false,
                error: undefined
            };
        case participanttable.FETCH_PARTICIPANTTABLE_FAILURE:
            return {
                ...state,
                participanttable: undefined,
                inProgress: false,
                error: action.payload,
            };
        case participanttable.FETCH_LASTUPDATED:
            return {
                ...state,
                inProgress: true,
            };
        case participanttable.FETCH_LASTUPDATED_SUCCESS:
            return {
                ...state,
                lastUpdated: action.payload,
                // .find(p => p.$key === 'lastUpdated') ? action.payload.find(p => p.$key === 'lastUpdated').$value : '',
                inProgress: false,
                error: undefined
            };
        case participanttable.FETCH_LASTUPDATED_FAILURE:
            return {
                ...state,
                lastUpdated: undefined,
                inProgress: false,
                error: action.payload,
            };
        default:
            return {
                ...state
            };
    }
}


export const getparticipanttableState = createFeatureSelector<ParticipanttableState>('participanttable');
export const getParticipanttable = createSelector(getparticipanttableState, (state: ParticipanttableState) => state.participanttable);
export const getNumberOne = createSelector(getparticipanttableState, (state: ParticipanttableState) => state.participanttable[0]);
export const getTopXTotaalStand = (x, tourhasended: boolean) => createSelector(getparticipanttableState, (state: ParticipanttableState) =>
    state && state.participanttable
        ? tourhasended
            ? [...state.participanttable].sort((a, b) => b.totaalpunten - a.totaalpunten).slice(0, x)
            : [...state.participanttable].sort((a, b) => b.etappepunten - a.etappepunten).slice(0, x)
        : []);
export const getLastUpdated = createSelector(getparticipanttableState, (state: ParticipanttableState) => state.lastUpdated);
export const getParticipantTotaalStandRecord = id =>
    createSelector(getparticipanttableState, (state: ParticipanttableState) =>
        state.participanttable.find(item =>
            item.id === id));
