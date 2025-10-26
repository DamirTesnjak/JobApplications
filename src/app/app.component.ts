import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../components/sidebar/sidebar";
import { Header } from "../components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'JobApplications';
}
