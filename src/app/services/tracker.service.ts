import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tracker } from '../model/tracker.model';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  constructor() {}

  getAllTrackers(): Observable<Tracker[]> {
    // Mock data with duplicate URLs
    const mockTrackers: Tracker[] = [
      { trackerName: 'CDS KPI', trackerLink: 'http://example.com/tracker1' },
      { trackerName: 'SEV KIL GLI 2', trackerLink: 'http://example.com/tracker1' }, // Duplicate URL
      { trackerName: 'WER NPK', trackerLink: 'http://example.com/tracker3' },
      { trackerName: 'NIQ HUP', trackerLink: 'http://example.com/tracker4' },
      { trackerName: 'ROP LODG D 5', trackerLink: 'http://example.com/tracker1' }  // Duplicate URL
    ];
    return of(mockTrackers);
  }
}
