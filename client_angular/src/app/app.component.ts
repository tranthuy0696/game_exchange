import { Component } from '@angular/core';
import {AuthService} from "./shared/services/rest/auth.rest-service";
import {User} from "./shared/model/user";
import {GameExchangeConstants} from "./shared/utils/game-exchange.constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isShowLogin: boolean = false;
  user: User = new User();

  menu = [
    {
      id: 'games',
      title: 'FORUMS',
      routerLink: '/games',
      items: [
        {
          id: 'search',
          title: 'Search',
          routerLink: '/search'
        },
        {
          id: 'watching',
          title: 'Watching',
          routerLink: '/watching'
        },
        {
          id: 'watched-tags',
          title: 'Watched Tags',
          routerLink: '/watched-tags'
        },
        {
          id: 'new-posts',
          title: 'New Posts',
          routerLink: '/new-posts'
        }
      ]
    },
    {
      id: 'shop',
      title: 'SHOP',
      routerLink: '/shop',
      items: [
        {
          id: 'search',
          title: 'Search Products',
          routerLink: '/search'
        },
        {
          id: 'search',
          title: 'Most Active Sellers',
          routerLink: '/search'
        },
        {
          id: 'search',
          title: 'Groups',
          routerLink: '/search'
        },
        {
          id: 'search',
          title: 'Products',
          routerLink: '/search'
        }
      ]
    },
    {
      id: 'supports',
      title: 'SUPPORT',
      routerLink: '/supports',
      items: [
        {
          id: 'search',
          title: 'Submit Ticket',
          routerLink: '/search'
        },
        {
          id: 'search',
          title: 'Your Tickets',
          routerLink: '/search'
        },
        {
          id: 'search',
          title: 'Knowledge Base',
          routerLink: '/search'
        }
      ]
    },
    {
      id: 'upgrades',
      title: 'UPGRADE',
      routerLink: '/upgrades'
    }
  ];

  menuButon = [];

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.menuButon = this.menu[0].items;
  }

  onClickItemMenu(items) {
    this.menuButon = items;
  }

  onShowLogin(){
    this.isShowLogin = !this.isShowLogin;
  }

  onClose(){
    this.isShowLogin = !this.isShowLogin;
  }

  onLogin() {
    this.authService.login(this.user)
      .subscribe(res => {
        if(res) {
          console.log("LOGIN SUCCESS");
          this.isShowLogin = !this.isShowLogin;
        }
      }, error => {
        console.log("LOGIN ERROR: " + error);
      })
  }

  isLogin() {
    return localStorage.getItem(GameExchangeConstants.USER_STORAGE);
  }
}
