import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { TableService } from './table.service';

describe('TableService', () => {
  let service: TableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableService],
    }).compile();

    service = module.get<TableService>(TableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should convert table name to valid db table name', () => {
    const dbTableName = service.generateValidDbTableName('!@#$_a ha3ha 中文');
    expect(dbTableName).toBe('_aha3ha');
  });

  it('should limit table name to 10', () => {
    const dbTableName = service.generateValidDbTableName('!@#$_a haha long long test for mr 中文');
    expect(dbTableName).toBe('_ahahalong');
  });

  it('should convert empty table name unnamed', () => {
    const dbTableName = service.generateValidDbTableName('中文');
    expect(dbTableName).toBe('unnamed');
  });
});
