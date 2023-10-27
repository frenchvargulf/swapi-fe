import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../services/loading/loading.service';
import { createPersonProperties } from '../models/person';

@Component({
  selector: 'app-properties-card',
  templateUrl: './person-properties-card.component.html',
  styleUrls: ['./person-properties-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule, CommonModule, MatCardModule]
})
export class PersonPropertiesCardComponent {
  @Input() properties = createPersonProperties();
  @Input() isLoading$;

  constructor(private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.getIsLoading();
  }
}
