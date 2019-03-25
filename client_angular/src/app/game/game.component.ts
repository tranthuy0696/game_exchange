import { Component, OnInit } from "@angular/core";
import { DataService } from "./data.service";

@Component({
    selector: "game-exchange",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.css"]
})

export class GameComponent implements OnInit {

  data = {};

  constructor(public dataService: DataService) {
    this.data = dataService.getData();

    $(document).ready(function(){
        $('.collapsible').collapsible();
    });
  }

  ngOnInit(): void {

  }
}
