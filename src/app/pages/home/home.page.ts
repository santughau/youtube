import { Component, OnInit } from "@angular/core";
import { YoutubeServiceService } from "src/app/youtube-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  data: [];
  channel: {};
  constructor(private service: YoutubeServiceService, private router: Router) {}

  ngOnInit() {
    this.service.getChannelData().subscribe((channelData) => {
      this.channel = channelData;
    });
    this.service.presentLoading();
    this.service.playlist().subscribe((res) => {
      this.data = res["items"];
      this.service.loadingController.dismiss();
    });
  }
  goToListPAge(id) {
    this.router.navigate(["/list", id]);
  }
}
