import { Component, OnInit } from "@angular/core";
import { YoutubeServiceService } from "src/app/youtube-service.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-video-details",
  templateUrl: "./video-details.page.html",
  styleUrls: ["./video-details.page.scss"],
})
export class VideoDetailsPage implements OnInit {
  videoId: string;
  videoData;
  url;
  constructor(
    private service: YoutubeServiceService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.videoId = this._route.snapshot.paramMap.get("id");

    this.service.getVideoDetails(this.videoId).subscribe((res) => {
      this.videoData = res["items"][0];
      console.log(this.videoData);
    });
  }
}
