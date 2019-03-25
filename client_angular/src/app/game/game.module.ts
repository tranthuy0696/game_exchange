import { NgModule } from "@angular/core";
import { GameComponent } from "./game.component";
import { GameRoutingModule } from "./game-routing.module";
import { FeatureMarketComponent } from "./featured-marketplaces/featured-marketplaces.component";
import { FeaturedMarketplacessPageComponent } from "../featured-marketplacess-page/featured-marketplacess-page.component";
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateThreadComponent } from './post/create-thread/create-thread.component';
import { MzSelectModule , MzInputModule,MzPaginationModule,MzBadgeModule, MzIconModule, MzIconMdiModule } from 'ngx-materialize';
import { PostComponent } from './post/post.component'
import { CKEditorModule } from "ng2-ckeditor";
import { PostItemsComponent } from './post/post-items/post-items.component';
import { PostService } from "./shared/services/post.service";
import { PaymentComponent } from './payment/payment.component';
@NgModule({
  declarations: [
    GameComponent,
    FeatureMarketComponent,
    CreateThreadComponent,
    PostComponent,FeaturedMarketplacessPageComponent,BreadcrumbComponent, PostItemsComponent, PaymentComponent
  ],
  exports: [],
  imports: [
    GameRoutingModule,
    CommonModule,
    CKEditorModule,
    FormsModule, ReactiveFormsModule
    , MzSelectModule, MzInputModule, MzPaginationModule,MzBadgeModule,MzIconModule, MzIconMdiModule
  ],
  providers: [PostService]
})
export class GameModule { }
