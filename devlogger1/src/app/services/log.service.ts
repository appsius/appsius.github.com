import { Injectable } from "@angular/core";

import { Log } from "../models/Log";

@Injectable({
  providedIn: "root",
})
export class LogService {
  logs: Log[];

  constructor() {
    this.logs = [
      {
        id: "1",
        text: "Generated Components",
        date: new Date("12/23/2020 12:22:33"),
      },
      {
        id: "2",
        text: "Bootstrap Setted Up",
        date: new Date("05/11/2019 04:43:44"),
      },
      {
        id: "3",
        text: "UI Elements Designed",
        date: new Date("01/13/2019 11:23:23"),
      },
    ];
  }

  getLogs() {
    return this.logs;
  }
}
