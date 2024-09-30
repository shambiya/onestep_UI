import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { UpdatepasswordComponent } from './authentication/updatepassword/updatepassword.component';
import { AdmindahshboardComponent } from './admin/admindahshboard/admindahshboard.component';
import { CreateAppComponent } from './admin/create-app/create-app.component';
import { LeadnavComponent } from './Lead/leadnav/leadnav.component';
import { TrackerListComponent } from './Lead/tracker-list/tracker-list.component';


const routes: Routes = [
  { path: '', component: TrackerListComponent },
  { path: 'admin', component: AdmindahshboardComponent },
  { path:'update-password',component:UpdatepasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
