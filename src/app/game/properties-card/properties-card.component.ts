import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { PersonProperties, createPersonProperties } from '../models/person';
import { of } from 'rxjs';
import { StarshipProperties } from '../models/starships';

@Component({
  selector: 'app-properties-card',
  templateUrl: './properties-card.component.html',
  styleUrls: ['./properties-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule, CommonModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesCardComponent {
  @Input() mode = 'Character';
  @Input() properties: PersonProperties | StarshipProperties = createPersonProperties();
  @Input() isLoading$ = of(false);
}
