import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as tour from './tour.actions';
import {ITour} from '../../models/tour.model';
import {ITeam} from '../../models/team.model';
import {ITourriders} from '../../models/tourriders.model';

export interface TourState {
  tours: ITour[];
  isRegistrationOpen: boolean;
  tour: ITour;
  teams: ITeam[];
  inProgress: boolean;
  error: any;
}

const initaltourState: TourState = {
  tours: undefined,
  isRegistrationOpen: undefined,
  tour: {
    id: undefined,
    endDate: null,
    startDate: null,
    tourName: '',
    isActive: undefined,
    deadline: undefined,
    hasEnded: undefined,
  },
  teams: [],
  error: undefined,
  inProgress: false,
};

export function tourReducer(state = initaltourState, action): TourState {
  switch (action.type) {
    case tour.FETCH_TOURLIST:
    case tour.FETCH_TOUR:
    case tour.FETCH_TOUR_BY_ID:
      return {
        ...state,
        inProgress: true,
      };
    case tour.FETCH_TOUR_SUCCESS:
      return {
        ...state,
        isRegistrationOpen: Date.parse(action.payload.deadline) >= Date.now(),
        tour: {
          tourName: action.payload.tourName,
          id: action.payload.id,
          isActive: action.payload.isActive,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
          deadline: action.payload.deadline,
          hasEnded: action.payload.hasEnded,
        },
        teams: action.payload.teams.map(team => {
          return {
            ...team,
            tourRiders: [...team.tourRiders].map(rider => {
              return {
                ...rider,
                isYoungster:
                    (new Date(action.payload.startDate).getFullYear() -
                        new Date(rider.rider.dateOfBirth).getFullYear()) < 26,
              };
            })
          };
        }),
        inProgress: false,
        error: undefined
      };
    case tour.Set_CURRENT_RIDER_AS_SELECTED_SUCCESS:
      return {
        ...state,
        teams: action.payload.teams,
      };
    case tour.FETCH_TOURLIST_SUCCESS:
      return {
        ...state,
        tours: action.payload,
        inProgress: false,
        error: undefined
      };
    case tour.FETCH_TOURLIST_FAILURE:
    case tour.FETCH_TOUR_FAILURE:
      return {
        ...state,
        tour: undefined,
        inProgress: false,
        error: action.payload,
      };
    case tour.Set_CURRENT_RIDER_AS_SELECTED:
      return {
        ...state,
        teams: [...state.teams].map(team => (team.id === action.payload.team.id ? {
          id: team.id,
          teamName: team.teamName,
          teamAbbreviation: team.teamAbbreviation,
          selected: team.selected,
          teamNameShort: team.teamNameShort,
          country: team.country,
          tourRiders: team.tourRiders.map(rider => (rider.id === action.payload.rider.id ?
              {...rider, isSelected: action.payload.selected} : rider)
          )
        } : team)),
        inProgress: false,
        error: undefined,
      };
    case tour.SAVE_RIDER_TO_TEAM_SUCCESS:
      return {
        ...state,
        teams: [...state.teams].map(
          team => (team.id === action.payload.team.id ? {
            id: team.id,
            teamName: team.teamName,
            teamAbbreviation: team.teamAbbreviation,
            selected: team.selected,
            teamNameShort: team.teamNameShort,
            country: team.country,
            tourRiders: [...team.tourRiders, action.payload]
          } : team)),
      };
      case tour.UPDATE_RIDER_FROM_TEAM_SUCCESS:
      return {
        ...state,
        teams: [...state.teams].map(
          team => (team.id === action.payload.team.id ? {
            id: team.id,
            teamName: team.teamName,
            teamAbbreviation: team.teamAbbreviation,
            selected: team.selected,
            teamNameShort: team.teamNameShort,
            country: team.country,
            tourRiders: team.tourRiders.map((item) => {
              if (item.id !== action.id) {
                return item;
              }
              return {
                ...action,
              };
            })
          } : team)),
      };
      case tour.DELETE_RIDER_FROM_TEAM_SUCCESS:
      return {
        ...state,
        teams: [...state.teams].map(
          team => ({
            id: team.id,
            teamName: team.teamName,
            teamAbbreviation: team.teamAbbreviation,
            selected: team.selected,
            teamNameShort: team.teamNameShort,
            country: team.country,
            tourRiders:  team.tourRiders ?
              team.tourRiders.filter(rider => rider.id !== action.payload) : team.tourRiders
          }))
      };
    default:
      return {
        ...state
      };
  }
}


export const gettourState = createFeatureSelector<TourState>('tour');
export const isRegistrationOpen = createSelector(gettourState, (state: TourState) => state.isRegistrationOpen);
export const getTour = createSelector(gettourState, (state: TourState) => state.tour);
export const getDeadline = createSelector(gettourState, (state: TourState) => state.tour.deadline);
export const getTourInProgress = createSelector(gettourState, (state: TourState) => state.inProgress);
export const getTourTeams = createSelector(gettourState, (state: TourState) => state.teams ? state.teams : undefined);
export const getTourRiders = createSelector(getTourTeams, (tourTeams: ITeam[]) => {
  let flattenTourRiders: ITourriders[] = [];
  tourTeams.map(tourteam => {
    flattenTourRiders = [...flattenTourRiders, ...tourteam.tourRiders];
  });
  return flattenTourRiders;
});

export const getTours = createSelector(gettourState, (state: TourState) => {
  return state.tours && state.tours.length > 0 ? [...state.tours]
    .sort((a, b) => +new Date(b.startDate) - +new Date(a.startDate)) : state.tours;
});
