import { NgModule } from "@angular/core";
import { GameComponent } from "./game.component";
import { PersonPropertiesCardComponent } from "./person-properties-card/person-properties-card.component";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [GameComponent],
    imports: [PersonPropertiesCardComponent, MatButtonModule, MatSnackBarModule, HttpClientModule, BrowserAnimationsModule],
    exports: [GameComponent],
})
export class GameModule { }

