import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "author",
    pathMatch: "full",
  },

  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "list/:id",
    loadChildren: () =>
      import("./pages/list/list.module").then((m) => m.ListPageModule),
  },
  {
    path: "video-details/:id",
    loadChildren: () =>
      import("./pages/video-details/video-details.module").then(
        (m) => m.VideoDetailsPageModule
      ),
  },
  {
    path: "author",
    loadChildren: () =>
      import("./pages/author/author.module").then((m) => m.AuthorPageModule),
  },
  {
    path: 'video',
    loadChildren: () => import('./pages/video/video.module').then( m => m.VideoPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
