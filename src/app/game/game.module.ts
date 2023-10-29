import { NgModule } from "@angular/core";
import { GameComponent } from "./game.component";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerHeaderComponent } from "./player-header/player-header.component";
import { PropertiesCardComponent } from "./properties-card/properties-card.component";

@NgModule({
    declarations: [GameComponent, PlayerHeaderComponent],
    imports: [PropertiesCardComponent, MatButtonModule, MatSnackBarModule, HttpClientModule, BrowserAnimationsModule],
    exports: [GameComponent],
})
export class GameModule { }

