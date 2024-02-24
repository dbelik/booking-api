import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CsvService } from '../../csv/csv.service';
import { AmenityRepository } from '../amenity.repository';
import { AmenityService } from '../amenity.service';
import { Amenity } from '../entities/amenity.entity';

describe('AmenityService', () => {
  let service: AmenityService;
  let csvService: CsvService;
  let amenityRepository: AmenityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AmenityService,
        {
          provide: CsvService,
          useValue: {
            parseCsv: jest.fn(),
          },
        },
        {
          provide: AmenityRepository,
          useValue: {
            updateMany: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AmenityService>(AmenityService);
    csvService = module.get<CsvService>(CsvService);
    amenityRepository = module.get<AmenityRepository>(AmenityRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('importAmenities', () => {
    it('should import amenities from CSV and update repository', async () => {
      const mockBuffer = Buffer.from('mock CSV content');
      const mockAmenities: Amenity[] = []; // Mock amenities data

      jest.spyOn(csvService, 'parseCsv').mockResolvedValue(mockAmenities);
      jest.spyOn(amenityRepository, 'updateMany').mockResolvedValue(null);

      const result = await service.importAmenities(mockBuffer);

      expect(csvService.parseCsv).toHaveBeenCalledWith(mockBuffer);
      expect(amenityRepository.updateMany).toHaveBeenCalledWith(mockAmenities);
      expect(result).toEqual(mockAmenities);
    });

    it('should throw UNPROCESSABLE_ENTITY error if failed to update repository', async () => {
      const mockBuffer = Buffer.from('mock CSV content');
      const mockAmenities: Amenity[] = []; // Mock amenities data

      jest.spyOn(csvService, 'parseCsv').mockResolvedValue(mockAmenities);
      jest
        .spyOn(amenityRepository, 'updateMany')
        .mockRejectedValue(new Error('example'));

      await expect(service.importAmenities(mockBuffer)).rejects.toThrowError(
        new HttpException(
          'Failed to import amenities from CSV',
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
      );

      expect(csvService.parseCsv).toHaveBeenCalledWith(mockBuffer);
      expect(amenityRepository.updateMany).toHaveBeenCalledWith(mockAmenities);
    });
  });
});
