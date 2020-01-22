import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ComponentDetailComponent } from "./component-detail/component-detail.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "events/:component-detail", component: ComponentDetailComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
