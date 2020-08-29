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
  datas: [];
  palyList;
  constructor(
    private service: YoutubeServiceService,
    private router: Router,
    private _route: ActivatedRoute,
    private youtube: YoutubeVideoPlayer
  ) {}

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get("id");

    this.service.playlistList(id).subscribe((res) => {
      this.datas = res["items"];
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
}
