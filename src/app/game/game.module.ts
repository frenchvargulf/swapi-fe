import { NgModule } from "@angular/core";
import { GameComponent } from "./game.component";
import { PersonPropertiesCardComponent } from "./person-properties-card/person-properties-card.component";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [GameComponent],
    imports: [PersonPropertiesCardComponent, MatButtonModule],
    exports: [GameComponent],
})
export class GameModule { }

