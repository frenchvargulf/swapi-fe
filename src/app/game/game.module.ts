import { NgModule } from "@angular/core";
import { GameComponent } from "./game.component";
import { PersonPropertiesCardComponent } from "./person-properties-card/person-properties-card.component";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [GameComponent],
    imports: [PersonPropertiesCardComponent, MatButtonModule, CommonModule, MatSnackBarModule, HttpClientModule],
    exports: [GameComponent],
})
export class GameModule { }

