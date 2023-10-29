import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertiesCardComponent } from './properties-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../services/loading/loading.service';
import { BehaviorSubject } from 'rxjs';
import { createPersonPropertiesMock } from '../models/person.mock';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';


describe('PropertiesCardComponent', () => {
  let component: PropertiesCardComponent;
  let fixture: ComponentFixture<PropertiesCardComponent>;
  let loadingService: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['getIsLoading']);

    TestBed.configureTestingModule({
      imports: [MatCardModule, MatProgressBarModule, MatDividerModule, CommonModule, PropertiesCardComponent],
      providers: [{ provide: LoadingService, useValue: loadingServiceSpy }],
    });

    fixture = TestBed.createComponent(PropertiesCardComponent);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display properties correctly', () => {
    const sampleProperties = {
      name: 'Luke Skywalker',
      homeworld: 'Tatooine',
      mass: '77kg',
    };
    component.properties = createPersonPropertiesMock(sampleProperties);

    fixture.detectChanges();

    const cardTitle = fixture.nativeElement.querySelector('mat-card-title').textContent;
    const cardSubtitle = fixture.nativeElement.querySelector('mat-card-subtitle').textContent;

    expect(cardTitle).toContain(sampleProperties.name);
    expect(cardSubtitle).toContain('Character');
  });

  it('should display a progress bar when isLoading$ is true', async () => {
    loadingService.getIsLoading.and.returnValue(new BehaviorSubject(true));
    fixture.detectChanges();

    const progressBarHarness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      MatProgressBarHarness
    );

    const progressBar = await progressBarHarness.host();
    expect(progressBar).toBeTruthy();
  });

  it('should not display a progress bar when isLoading$ is false', () => {
    loadingService.getIsLoading.and.returnValue(new BehaviorSubject(false));
    fixture.detectChanges();

    const progressBar = fixture.nativeElement.querySelector('.mat-progress-bar');
    expect(progressBar).toBeFalsy();
  });
});