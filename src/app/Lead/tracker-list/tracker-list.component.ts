import { Component, OnInit } from '@angular/core';
import { Tracker } from 'src/app/model/tracker.model';
import { TrackerService } from 'src/app/services/tracker.service';


@Component({
  selector: 'app-tracker-list',
  templateUrl: './tracker-list.component.html',
  styleUrls: ['./tracker-list.component.css']
})
export class TrackerListComponent implements OnInit {
  trackers: Tracker[] = [];

  constructor(private trackerService: TrackerService) {}

  ngOnInit(): void {
    this.getAllTrackers();
  }

  getAllTrackers(): void {
    this.trackerService.getAllTrackers().subscribe((data: Tracker[]) => {
      this.trackers = data;
    });
  }
}
