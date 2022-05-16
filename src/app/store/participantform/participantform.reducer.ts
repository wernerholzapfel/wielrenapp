import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as participantform from './participantform.actions';

export interface ParticipantformState {
    inProgress: boolean;
    rider: any[];
    error: any;
}

const initalparticipantformState: ParticipantformState = {
    inProgress: false,
    rider: [],
    error: undefined
};

export function participantformReducer(state = initalparticipantformState, action): ParticipantformState {
    switch (action.type) {
        case participantform.FETCH_PARTICIPANTFORM:
            return {
                ...state,
                inProgress: true,
            };
        case participantform.FETCH_PARTICIPANTFORM_SUCCESS:
            return {
                ...state,
                rider: action.payload,
                inProgress: false,
                error: undefined
            };
        case participantform.FETCH_PARTICIPANTFORM_FAILURE:
            return {
                ...state,
                inProgress: false,
                error: action.payload,
            };
        case participantform.ADD_RIDER_TO_FORM:
            return {
                ...state,
                rider: [...state.rider.map((r, i) => {
                    if (action.payload.index === i) {
                        console.log(r);
                        console.log(action.payload);
                        return {...action.payload};
                    } else {
                        return r;
                    }
                })],
            };
        case participantform.CLEAR_PARTICIPANTFORM:
            return {
                ...state,
                rider: [],
            };
        case participantform.DELETE_RIDER_FROM_FORM:
            return {
                ...state,
                rider: state.rider.map(rider => {
                    if (rider.id === action.payload.id) {
                        return {
                            ...rider, id: null, rider: {
                                rider: {
                                    firstName: determineFirstname(rider)
                                }
                            }
                        };
                    } else {
                        return rider;
                    }
                }),
            };
        default:
            return {
                ...state
            };
    }
}


export const getparticipantformState = createFeatureSelector<ParticipantformState>('participantform');
export const getParticipantforms = createSelector(getparticipantformState, (state: ParticipantformState) => state.rider);

function determineFirstname(rider: any) {
    return rider.isRider ? 'Kies Renner' :
        rider.isWaterdrager ? 'Kies Waterdrager' :
            rider.isMeesterknecht ? 'Kies Meesterknecht' :
                rider.isLinkebal ? 'Kies Joker' :
                    rider.isBeschermdeRenner ? 'Kies Beschermde renner' :
                        'Kies';
}
