import { Component, OnInit } from '@angular/core';
import { MapsService } from '../maps.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  
  // Lists
  driving: any[];
  walking: any[];
  bicycling: any[];
  transit: any[];

  startLat: number;
  startLon: number;
  endLat: number;
  endLon: number;

  from: string;
  to: string;

  lat = 41.3851;
  lng = 2.1734;

  selectedMode: string;

  constructor(private mapService: MapsService) {}

  ngOnInit() {
    this.getCosas();
  }

  public getCosas(): void {
    this.mapService.getCosas().subscribe(c => {
      this.driving = c.driving;
      this.walking = c.walking;
      this.bicycling = c.bicycling;
      this.transit = c.transit;
      this.startLat = c.driving.start_lat;
      this.startLon = c.driving.start_lon;
      this.endLat = c.driving.end_lat;
      this.endLon = c.driving.end_lon;
      this.from = c.driving.start_description;
      this.to = c.driving.end_description;
    });
  }

  public selectMode(mode: string): void {
    this.selectedMode = mode;
  }
}
