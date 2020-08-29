import { Component, OnInit } from "@angular/core";
import { YoutubeServiceService } from "src/app/youtube-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  data = [] as any;
  channel: {};
  nextPageToken: any;
  constructor(private service: YoutubeServiceService, private router: Router) {}

  ngOnInit() {
    this.service.getChannelData().subscribe((channelData) => {
      this.channel = channelData;
    });
    this.service.presentLoading();
    this.service.playlist().subscribe((res) => {
      this.data = res["items"];
      this.nextPageToken = res["nextPageToken"];
      this.service.loadingController.dismiss();
    });
  }
  goToListPAge(id) {
    this.router.navigate(["/list", id]);
  }

  infiniteScrool(ev) {
    if (this.nextPageToken) {
      this.service.GetFullplaylist(this.nextPageToken).subscribe((res) => {
        for (let i of res["items"]) {
          this.data.push(i);
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
