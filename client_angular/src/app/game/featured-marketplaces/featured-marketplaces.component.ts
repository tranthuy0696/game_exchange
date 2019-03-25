import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "featured-marketplaces",
    templateUrl: "./featured-marketplaces.component.html",
    styleUrls: ["./featured-marketplaces.component.css"]
})

export class FeatureMarketComponent implements OnInit {

    @Input() dataView: Array<object>;
    @Input() config: Object = {
      overClass: '',
      onClickTitle: (item) => {

      }
    };

    constructor() {
       
    }

    ngOnInit(): void {
        
    }
}
