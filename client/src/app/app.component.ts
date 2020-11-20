import { Component } from '@angular/core';
import { Data } from './data';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * @description Received messages
   */
  message$ = this.dataService.message$;
  /**
   * @description Data to be sent
   */
  data: Data;

  /**
   * Constructor
   */
  constructor(private dataService: DataService) {
    this.data = new Data();
  }

  /**
   * Send messages
   */
  sendMessage(cmdId: string, payload: object) {
    this.dataService.sendMessage({
      cmdId: cmdId,
      msgId: 'all',
      payload: payload,
    });
  }
}
