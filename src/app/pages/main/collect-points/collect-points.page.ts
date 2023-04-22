import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-collect-points',
  templateUrl: './collect-points.page.html',
  styleUrls: ['./collect-points.page.scss'],
})
export class CollectPointsPage implements OnInit {

  constructor() { }

  public map!: Leaflet.Map;

  public markers: Leaflet.Marker[] = [];

  public options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 16,
    center: { lat: 28.626137, lng: 79.821603 },
  };

  public ngOnInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = Leaflet.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });

    const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    );

    tiles.addTo(this.map);
  }

}
