import { TestBed } from '@angular/core/testing';

import { DbBackupService } from './db-backup.service';

describe('DbBackupService', () => {
  let service: DbBackupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbBackupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
