import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  games = [
    {
      id: '1',
      title: "Clash of Clans Accounts - Buy Sell Trade",
      listings: "108,632",
      categories: "4",
      today: "3:56 PM",
      latest: "[VERIFIED] Th 11 Low Defense| Maxed Heroes 50/50/20| Maxed Troops| Maxed Walls| Maxed Builder Hall 8",
      user: "just_g",
      imgUrl: 'assets/images/game_pokemon_go.png',
      items: [
        {
          id: '11',
          title: "Clash of Clans Accounts - Buy Sell Trade 1",
          listings: "108,632",
          today: "3:56 PM",
          latest: "[VERIFIED] Th 11 Low Defense| Maxed Heroes 50/50/20| Maxed Troops| Maxed Walls| Maxed Builder Hall 8",
          user: "just_g",
          imgUrl: 'assets/images/game_pokemon_go.png'
        },
        {
          id: '12',
          title: "Clash of Clans Accounts - Buy Sell Trade 2",
          listings: "108,632",
          today: "3:56 PM",
          latest: "[VERIFIED] Th 11 Low Defense| Maxed Heroes 50/50/20| Maxed Troops| Maxed Walls| Maxed Builder Hall 8",
          user: "just_g",
          imgUrl: 'assets/images/game_pokemon_go.png'
        },
        {
          id: '13',
          title: "Clash of Clans Accounts - Buy Sell Trade 3",
          listings: "108,632",
          today: "3:56 PM",
          latest: "[VERIFIED] Th 11 Low Defense| Maxed Heroes 50/50/20| Maxed Troops| Maxed Walls| Maxed Builder Hall 8",
          user: "just_g",
          imgUrl: 'assets/images/game_pokemon_go.png'
        }
      ]
    },
    {
      id: '2',
      title: "Clash Royale Accounts - Buy Sell Trade",
      listings: "14,632",
      categories: "3",
      today: "4:00 PM",
      latest: "Level 13 | +5100 Trophy | Max Deck | About 25 Max card | with 236 k gold 1753 Gem | End Game account",
      user: "Raj-Hansh",
      imgUrl: 'https://www.playerup.com/styles/ForumCube/BgImages/c607d3aaed5b0ba1e66883615f7e5e50.jpg'
    },
    {
      id: '3',
      title: "Fortnite Accounts - Buy Sell Trade",
      listings: "203,632",
      categories: "5",
      today: "4:04 PM",
      latest: "2007 Account 5K RAP has old bunny ears",
      user: "David_Ghenciu",
      imgUrl: 'https://www.playerup.com/styles/ForumCube/BgImages/7882249de27a558de5320e7cd11ba741.jpg'
    }
  ];

  masketings = [
    {
      title: "Clash of Clans Accounts - Buy Sell Trade",
      listings: "108,632",
      categories: "4",
      today: "3:56 PM",
      latest: "[VERIFIED] Th 11 Low Defense| Maxed Heroes 50/50/20| Maxed Troops| Maxed Walls| Maxed Builder Hall 8",
      user: "just_g",
      icon: "https://www.playerup.com/images/nodes/adventurequest.png"
    },
    {
      title: "Clash Royale Accounts - Buy Sell Trade",
      listings: "14,632",
      categories: "3",
      today: "4:00 PM",
      latest: "Level 13 | +5100 Trophy | Max Deck | About 25 Max card | with 236 k gold 1753 Gem | End Game account",
      user: "Raj-Hansh",
      icon: "https://www.playerup.com/images/nodes/blackdesert.png"
    },
    {
      title: "Fortnite Accounts - Buy Sell Trade",
      listings: "203,632",
      categories: "5",
      today: "4:04 PM",
      latest: "2007 Account 5K RAP has old bunny ears",
      user: "David_Ghenciu",
      icon: "https://www.playerup.com/images/nodes/bleachonline.png"
    }
  ];

  disputes = [
    {
      title: "Disputes",
      listings: "108,632",
      categories: "4",
      today: "3:56 PM",
      latest: "[VERIFIED] Th 11 Low Defense| Maxed Heroes 50/50/20| Maxed Troops| Maxed Walls| Maxed Builder Hall 8",
      user: "just_g",
      icon: "https://www.playerup.com/images/nodes/disputes99.png"
    },
    {
      title: "Feedback",
      listings: "14,632",
      categories: "3",
      today: "4:00 PM",
      latest: "Level 13 | +5100 Trophy | Max Deck | About 25 Max card | with 236 k gold 1753 Gem | End Game account",
      user: "Raj-Hansh",
      icon: "https://www.playerup.com/images/nodes/warning999.png"
    }
  ];

  support = [
    {
      title: "Guides - Answers Most Questions",
      listings: "108,632",
      today: "3:56 PM",
      latest: "[VERIFIED] Th 11 Low Defense| Maxed Heroes 50/50/20| Maxed Troops| Maxed Walls| Maxed Builder Hall 8",
      user: "just_g",
      icon: "https://www.playerup.com/images/nodes/guides90.png"
    },
    {
      title: "Help - General Support Questions",
      listings: "14,632",
      today: "4:00 PM",
      latest: "Level 13 | +5100 Trophy | Max Deck | About 25 Max card | with 236 k gold 1753 Gem | End Game account",
      user: "Raj-Hansh",
      icon: "https://www.playerup.com/images/nodes/help99.png"
    },
    {
      title: "Help - Middleman Support Questions",
      listings: "203,632",
      today: "4:04 PM",
      latest: "2007 Account 5K RAP has old bunny ears",
      user: "David_Ghenciu",
      icon: "https://www.playerup.com/images/nodes/middleman99.png"
    }
  ];

  getData() {
    return {
      games: this.games,
      masketings: this.masketings,
      disputes: this.disputes,
      support: this.support,
    }
  }
}
