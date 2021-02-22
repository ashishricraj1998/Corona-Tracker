import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input('tot_confirmed') tot_confirmed;
  @Input('tot_recovered') tot_recovered;
  @Input('tot_deaths') tot_deaths;
  @Input('tot_active') tot_active;




  constructor() { }

  ngOnInit(): void {
  }

}
