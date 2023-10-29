import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-player-header',
  templateUrl: './player-header.component.html',
  styleUrls: ['./player-header.component.scss']
})
export class PlayerHeaderComponent {
  @Input() player = '';
  @Input() winCount$ = new BehaviorSubject(0);
  @Input() cypressSelector = '';
}
