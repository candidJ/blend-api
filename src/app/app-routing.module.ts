import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { NavbarModule } from "src/app/shared/modules/navbar/navbar.module";

const routes = [
  {
    path: "",
    redirectTo: "quotes",
    pathMatch: "full",
  },
  {
    path: "quotes",
    loadChildren: () =>
      import("src/app/quotes/quotes.module").then((m) => m.QuotesModule),
  },
  {
    path: "weather",
    loadChildren: () =>
      import("src/app/weather/weather.module").then((m) => m.WeatherModule),
  },
  {
    path: "news",
    loadChildren: () =>
      import("src/app/news-api/news-api.module").then((m) => m.NewsApiModule),
  },
  {
    path: "calculator",
    loadChildren: () =>
      import("src/app/calculator/calculator.module").then(
        (m) => m.CalculatorModule
      ),
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    NavbarModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
