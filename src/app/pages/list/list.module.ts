import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player/ngx";

import { IonicModule } from "@ionic/angular";

import { ListPageRoutingModule } from "./list-routing.module";

import { ListPage } from "./list.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ListPageRoutingModule],
  providers: [YoutubeVideoPlayer],
  declarations: [ListPage],
})
export class ListPageModule {}
