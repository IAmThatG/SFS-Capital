import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export interface AlertMsg {
  message: string;
  type: AlertType;
}

export enum AlertType {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info'
}

@Injectable({
  providedIn: 'root'
})
export class AlertMsgService {

  private _subject = new Subject<string>();
  private _msg: string;
  private _type: string

  constructor() { }

  configure(): void {
    this._subject.subscribe((message) => this._msg = message);
    this._subject.pipe(debounceTime(5000)).subscribe(() => this.msg = null);
  }

  // show(alert: AlertMsg): void {
  //   this._subject.next(alert);
  // }

  show(): void {
    if (this.msg && this.type) {
      this._subject.next(this.msg);
    }
  }


  public get type(): string {
    return this._type;
  }


  public set type(v: string) {
    this._type = v;
  }

  public get msg(): string {
    return this._msg;
  }

  public set msg(v: string) {
    this._msg = v;
  }

}
