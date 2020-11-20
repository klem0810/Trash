import { Component } from '@angular/core';
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
   * Constructor
   */
  constructor(private dataService: DataService) {}

  /**
   * Send messages
   */
  sendMessage() {
    this.dataService.sendMessage({
      method: 'GetStatus',
      id:'all',
      payload:''
    });
  }
}
