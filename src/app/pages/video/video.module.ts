import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player/ngx";

import { IonicModule } from "@ionic/angular";

import { VideoPageRoutingModule } from "./video-routing.module";

import { VideoPage } from "./video.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, VideoPageRoutingModule],
  providers: [YoutubeVideoPlayer],
  declarations: [VideoPage],
})
export class VideoPageModule {}
