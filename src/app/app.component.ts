import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app works!';
  person;
  constructor(private http:Http){}
  fetchData() {
    this.person = this.http.get('/api/recipes').map(res => res.json());
  }
}
