
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../game/data.service';

@Component({
  selector: 'app-featured-marketplacess-page',
  templateUrl: './featured-marketplacess-page.component.html',
  styleUrls: ['./featured-marketplacess-page.component.scss']
})
export class FeaturedMarketplacessPageComponent implements OnInit {
  id: number;
  private sub: any;

  data = [];
  config = {
    overClass: '',
    onClickTitle: this.onClickTitle
  };
  item = {
    items: []
  };
  itemListBreadcromb = [
    {
      title: 'Home',
      path: ''
    },
    {
      title: 'Forums',
      path: ''
    },
    {
      title: 'Featured Marketplaces',
      path: '',
      active: true
    }
    // {
    //   title: 'Fortnite Accounts - Buy Sell Trade',
    //   path: '',
    //   active: true
    // }
  ];

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    let games = [];
    games = this.dataService.getData().games;
    this.item = games.find((item) => {
      return item.id == this.id;
    });

    if(this.item) {
      this.data = this.item.items;
    } else {
      this.data = [];
    }
  }

  onClickTitle(item) {
    console.log(item.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
