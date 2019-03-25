import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../shared/services/auth-guard.service";
import { PaymentComponent } from './payment/payment.component';
import { GameComponent } from './game.component';
import { PostComponent } from './post/post.component'
import { FeaturedMarketplacessPageComponent } from '../featured-marketplacess-page/featured-marketplacess-page.component';
import { PostItemsComponent } from './post/post-items/post-items.component';
import { CreateThreadComponent } from './post/create-thread/create-thread.component';
const routes: Routes = [
  { path: '', component: GameComponent, canActivate: [AuthGuard]},
  { path: 'createThread', component: CreateThreadComponent, canActivate: [AuthGuard]},
  { path: 'post', component: PostComponent},
  { path: 'post/item', component: PostItemsComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'marketplaces/:id', component: FeaturedMarketplacessPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule { }
