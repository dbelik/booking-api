import { validate } from 'class-validator';

import { AmenityDTO } from '../amenity.dto';
import { AmenityImportDTO } from '../amenity-import.dto';

describe('AmenityImportDTO', () => {
  let amenityImportDTO: AmenityImportDTO;

  beforeEach(() => {
    amenityImportDTO = new AmenityImportDTO();
  });

  it('should be valid with correct properties', async () => {
    const amenityDTO1 = new AmenityDTO();
    amenityDTO1.id = 1;
    amenityDTO1.name = 'Test Amenity 1';

    const amenityDTO2 = new AmenityDTO();
    amenityDTO2.id = 2;
    amenityDTO2.name = 'Test Amenity 2';

    amenityImportDTO.data = [amenityDTO1, amenityDTO2];

    const errors = await validate(amenityImportDTO);
    expect(errors.length).toBe(0);
  });

  it('should not be valid if data is empty', async () => {
    amenityImportDTO.data = [];

    const errors = await validate(amenityImportDTO);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not be valid if data contains more than 32 items', async () => {
    const amenityDTOs = [];
    for (let index = 0; index < 33; index += 1) {
      const amenityDTO = new AmenityDTO();
      amenityDTO.id = index + 1;
      amenityDTO.name = `Test Amenity ${index + 1}`;
      amenityDTOs.push(amenityDTO);
    }
    amenityImportDTO.data = amenityDTOs;

    const errors = await validate(amenityImportDTO);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not be valid if data contains less than 1 item', async () => {
    amenityImportDTO.data = [];

    const errors = await validate(amenityImportDTO);
    expect(errors.length).toBeGreaterThan(0);
  });
});
