import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, of } from "rxjs";

import { Log } from "../models/Log";

@Injectable({
  providedIn: "root",
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null,
  });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {
    //     id: "1",
    //     text: "Generated Components",
    //     date: new Date("12/23/2020 12:22:33"),
    //   },
    //   {
    //     id: "2",
    //     text: "Bootstrap Setted Up",
    //     date: new Date("05/11/2019 04:43:44"),
    //   },
    //   {
    //     id: "3",
    //     text: "UI Elements Designed",
    //     date: new Date("01/13/2019 11:23:23"),
    //   },
    // ];

    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem("logs") === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem("logs"));
    }

    return of(
      this.logs.sort((a, b) => {
        return b.date - a.date;
      })
    );
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    // Add to localstorage
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    // Update to localstorage
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    // Delete from local storage
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
