import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {
    constructor(private httpClient: HttpClient) { }
    data = [
        { id: 1, title: 'Clash of Clans Accounts and CoC Bases', parent: 'Clash of Clans CoC Accounts', posts: [] },
        { id: 2, title: 'Clash of Clans Accounts and CoC Bases', parent: 'Clash of Clans CoC Accounts', posts: [] },
        { id: 3, title: 'Clash of Clans Accounts and CoC Bases', parent: 'Clash of Clans CoC Accounts', posts: [] },
    ];
    dataPost = [
        {
            id: 1, title: ' Two very old level 85 accounts for $75',
            type: 'SELLING', price: 188, feedback: 163445,
            owner: { name: 'OneHive Vicious', image: 'https://www.playerup.com/data/avatars/l/302/302987.jpg?1529253436' },
            postDate: '11/3/18', replies: 2, view: 99
        },
        {
            id: 2, title: 'Level 32 AlphaDOOMmega (LEGEND Account) ~ 43 AWESOME ITEMS +8Years Old (Can Buy/Wear AC Items)',
            type: 'SELLING', price: 188, feedback: 16,
            owner: { name: 'OneHive Vicious', image: 'https://www.playerup.com/data/avatars/l/302/302987.jpg?1529253436' },
            postDate: '11/3/18', replies: 2, view: 99
        },
        {
            id: 3, title: 'Adventure Quest Guardian Account | 10+ years old | 350k+ Gold | Price Negotiable |',
            type: 'SELLING', price: 188, feedback: 16,
            owner: { name: 'OneHive Vicious', image: 'https://www.playerup.com/data/avatars/l/302/302987.jpg?1529253436' },

            postDate: '11/3/18', replies: 2, view: 99
        },
        {
            id: 4, title: '  Selling Level 85 account with Void Highlord',
            type: 'SELLING', price: 188, feedback: 16,
            owner: { name: 'OneHive Vicious', image: 'https://www.playerup.com/data/avatars/l/302/302987.jpg?1529253436' },
            postDate: '11/3/18', replies: 2, view: 99
        },
        {
            id: 5,
            title: ' Max Th 12 | Heroes Max K Q W 60/60/30 | Max Th 12 | Heroes Max K Q W 60/60/30 |Max Th 12 |',
            type: 'SELLING', price: 188, feedback: 16,
            owner: { name: 'OneHive Vicious', image: 'https://www.playerup.com/data/avatars/l/302/302987.jpg?1529253436' },
            postDate: '11/3/18', replies: 2, view: 99
        },
        {
            id: 6,
            title: ' Max Th 12 | Heroes Max K Q W 60/60/30 | Max Th 12 | Heroes Max K Q W 60/60/30 |Max Th 12 | ',
            type: 'SELLING', price: 188, feedback: 16,
            owner: { name: 'OneHive Vicious', image: 'https://www.playerup.com/data/avatars/l/302/302987.jpg?1529253436' },
            postDate: '11/3/18', replies: 2, view: 99
        },

    ];
    dataComment = [
        {
            content: '', owner: {
                id: 1, name: 'Ramp', dateJoin: '2/10/2018', postsNumber: 18, likesReceived: 2,
                image: 'https://www.playerup.com/data/avatars/l/302/302987.jpg?1529253436'
            }, date: 'Wednesday at 6:36 PM'
        },
        {
            content: '', owner: {
                id: 2, name: 'M0h3n', dateJoin: '2/10/2018', postsNumber: 18, likesReceived: 2,
                image: 'https://www.playerup.com/data/avatars/l/213/213788.jpg?1517237504'
            }, date: 'Wednesday at 6:36 PM'
        },
        {
            content: '', owner: {
                id: 2, name: 'M0h3n', dateJoin: '2/10/2018', postsNumber: 18, likesReceived: 2,
                image: 'https://www.playerup.com/data/avatars/l/213/213788.jpg?1517237504'
            }, date: 'Wednesday at 6:36 PM'
        },
        {
            content: '', owner: {
                id: 1, name: 'Ramp', dateJoin: '2/10/2018', postsNumber: 18, likesReceived: 2,
                image: 'https://www.playerup.com/data/avatars/l/302/302987.jpg?1529253436'
            }, date: 'Wednesday at 6:36 PM'
        },
        {
            content: '', owner: {
                id: 2, name: 'M0h3n', dateJoin: '2/10/2018', postsNumber: 18, likesReceived: 2,
                image: 'https://www.playerup.com/data/avatars/l/213/213788.jpg?1517237504'
            }, date: 'Wednesday at 6:36 PM'
        },
        {
            content: '', owner: {
                id: 1, name: 'Ramp', dateJoin: '2/10/2018', postsNumber: 18, likesReceived: 2,
                image: '../../../../assets/images/gamepost.jpg'
            }, date: 'Wednesday at 6:36 PM'
        },

    ];
    dataUser = [
        {
            id: 1, name: 'Ramp', dateJoin: '2/10/2018', postsNumber: 18, likesReceived: 2,
            image: 'https://www.playerup.com/data/avatars/l/302/302987.jpg?1529253436'
        },
        {
            id: 2, name: 'M0h3n', dateJoin: '2/10/2018', postsNumber: 18, likesReceived: 2,
            image: 'https://www.playerup.com/data/avatars/l/213/213788.jpg?1517237504'
        },


    ];


    getPosts(i) {
        const result = this.data[i];
        result.posts = this.dataPost;
        return result;


    }

    getComent(i) {
        return {
            title: 'Level 32 AlphaDOOMmega (LEGEND Account) ~ 43 AWESOME ITEMS +8Years Old (Can Buy/Wear AC Items)', type: 'SELLING',
            id: 1, price: 188, content: '', postDate: 'Wednesday at 6:36 PM', user: this.dataUser[1],
            comments: this.dataComment
        };



    }

}