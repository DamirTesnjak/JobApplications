import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../components/sidebar/sidebar";
import { Header } from "../components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './app.component.html',
  styleUrls: [
    '../styles/mainLayout/container.module.scss',
    '../styles/global/globals.module.scss',
    '../components/sidebar/sidebar.scss',
    '../components/header/header.scss'
  ]
})
export class AppComponent {
  title = 'JobApplications';
  sidebarLinks = [
    { link: '/candidates', text: 'candidates' },
    { link: '/settings', text: 'settings' },
  ]
}
