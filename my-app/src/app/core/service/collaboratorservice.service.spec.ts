import { TestBed } from '@angular/core/testing';

import { CollaboratorserviceService } from './collaboratorservice.service';

describe('CollaboratorserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollaboratorserviceService = TestBed.get(CollaboratorserviceService);
    expect(service).toBeTruthy();
  });
});
