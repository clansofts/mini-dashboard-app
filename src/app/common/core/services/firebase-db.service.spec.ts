import { TestBed, inject } from '@angular/core/testing';

import { FirebaseDbService } from './firebase-db.service';

describe('FirebaseDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseDbService]
    });
  });

  it('should be created', inject([FirebaseDbService], (service: FirebaseDbService) => {
    expect(service).toBeTruthy();
  }));
});
