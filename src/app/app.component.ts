import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnumsComponent } from './enums/enums.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EnumsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular19-dbmaestro';
}
