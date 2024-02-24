import { validate } from 'class-validator';

import { AmenityDTO } from '../amenity.dto';

describe('AmenityDTO', () => {
  let amenityDTO: AmenityDTO;

  beforeEach(() => {
    amenityDTO = new AmenityDTO();
  });

  it('should be valid with correct properties', async () => {
    amenityDTO.id = 1;
    amenityDTO.name = 'Test Amenity';

    const errors = await validate(amenityDTO);
    expect(errors.length).toBe(0);
  });

  it('should not be valid with invalid id', async () => {
    amenityDTO.id = 'invalid_id' as any;
    amenityDTO.name = 'Test Amenity';

    const errors = await validate(amenityDTO);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not be valid with empty name', async () => {
    amenityDTO.id = 1;
    amenityDTO.name = '';

    const errors = await validate(amenityDTO);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not be valid with name longer than 64 characters', async () => {
    amenityDTO.id = 1;
    amenityDTO.name = 'a'.repeat(65);

    const errors = await validate(amenityDTO);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should not be valid with name shorter than 1 character', async () => {
    amenityDTO.id = 1;
    amenityDTO.name = '';

    const errors = await validate(amenityDTO);
    expect(errors.length).toBeGreaterThan(0);
  });
});
