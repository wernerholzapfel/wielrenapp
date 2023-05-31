import { IEtappe } from "./etappe.model"
import { IPrediction, ITourrider } from "./participant.model"

export enum PredictionTypeEnum {
  ETAPPE = 'etappe',
  BERG = 'berg',
  ALGEMEEN = 'algemeen',
  JONGEREN = 'jongeren',
  PUNTEN = 'punten'
}

export interface IPredictionScoreForParticipant {
  id: string
  prediction: IPrediction
  rider: ITourrider
  isOut: boolean
  waarde: number
  updatedDate: string
  predictionType: string
  punten: number
}

