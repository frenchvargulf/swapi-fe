import { NgModule } from "@angular/core";
import { GameComponent } from "./game.component";
import { PersonPropertiesCardComponent } from "./person-properties-card/person-properties-card.component";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [GameComponent],
    imports: [PersonPropertiesCardComponent, MatButtonModule, CommonModule],
    exports: [GameComponent],
})
export class GameModule { }

