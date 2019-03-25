import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  sell = 'SELLING';
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
    }];
  item;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.item = this.postService.getPosts(0);
    console.log(this.item);
  }

}
