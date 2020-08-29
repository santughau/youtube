import { Component, OnInit } from "@angular/core";
import { YoutubeServiceService } from "src/app/youtube-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player/ngx";

@Component({
  selector: "app-list",
  templateUrl: "./list.page.html",
  styleUrls: ["./list.page.scss"],
})
export class ListPage implements OnInit {
  datas = [] as any;
  palyList;
  nextPageToken: any;
  id;
  constructor(
    private service: YoutubeServiceService,
    private router: Router,
    private _route: ActivatedRoute,
    private youtube: YoutubeVideoPlayer
  ) {}

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get("id");
    this.id = id;

    this.service.playlistList(id).subscribe((res) => {
      this.datas = res["items"];
      this.nextPageToken = res["nextPageToken"];
    });
    this.service.presentLoading();
    this.service.playlist(id).subscribe((playListDetails) => {
      this.palyList = playListDetails;
      this.service.loadingController.dismiss();
    });
  }
  goToListPAge(id) {
    console.log(id);
    this.youtube.openVideo(id);
  }

  infiniteScrool(ev) {
    if (this.nextPageToken) {
      this.service
        .GetFullplaylistList(this.id, this.nextPageToken)
        .subscribe((res) => {
          for (let i of res["items"]) {
            this.datas.push(i);
          }
          if (!res["nextPageToken"]) {
            this.nextPageToken = null;
          } else {
            this.nextPageToken = res["nextPageToken"];
          }
          ev.target.complete();
        });
    } else {
      ev.target.disabled = true;
    }
  }
}
