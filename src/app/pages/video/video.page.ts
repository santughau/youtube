import { Component, OnInit } from "@angular/core";
import { YoutubeServiceService } from "src/app/youtube-service.service";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player/ngx";

@Component({
  selector: "app-video",
  templateUrl: "./video.page.html",
  styleUrls: ["./video.page.scss"],
})
export class VideoPage implements OnInit {
  list = [] as any;
  nextPageToken: any;
  constructor(
    private service: YoutubeServiceService,
    private youtube: YoutubeVideoPlayer
  ) {}

  ngOnInit() {
    this.service.presentLoading();
    this.service.getAllVideos().subscribe((res) => {
      this.list = res["items"];
      this.nextPageToken = res["nextPageToken"];

      this.service.loadingController.dismiss();
    });
  }
  goToListPAge(id) {
    console.log(id);
    this.youtube.openVideo(id);
  }

  infiniteScrool(ev) {
    if (this.nextPageToken) {
      this.service.playlistList_page(this.nextPageToken).subscribe((data) => {
        for (let i of data["items"]) {
          this.list.push(i);
        }
        if (!data["nextPageToken"]) {
          this.nextPageToken = null;
        } else {
          this.nextPageToken = data["nextPageToken"];
        }
        ev.target.complete();
      });
    } else {
      ev.target.disabled = true;
    }
  }
}
