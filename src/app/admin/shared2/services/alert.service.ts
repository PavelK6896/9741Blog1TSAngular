import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export type AlertType = 'success' | 'warning' | 'danger'

export interface Alert {
  type: AlertType
  text: string

}

//регистрируем в админ модуле и доступен только в админ
@Injectable()
export class AlertService {

  // $ обозначить что это стрим
  public alert$ = new Subject<Alert>()

  success(text: string) {
    this.alert$.next({type: 'success', text})
  }
  warning(text: string) {
    this.alert$.next({type: 'warning', text})
  }
  danger(text: string) {
    this.alert$.next({type: 'danger', text})
  }
}
