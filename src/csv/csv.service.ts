import { Injectable } from '@nestjs/common';
import { parse, ParseResult } from 'papaparse';
import { Readable } from 'typeorm/platform/PlatformTools';

@Injectable()
export class CsvService {
  async parseCsv<T>(buffer: Buffer): Promise<ParseResult<T>> {
    const stream = Readable.from(buffer);
    return new Promise<ParseResult<T>>((resolve, reject) => {
      parse<T>(stream, {
        header: true,
        worker: true,
        skipEmptyLines: true,
        delimiter: ',',
        complete: resolve,
        error: reject,
        transformHeader: (header) => header.trim().replaceAll(/\s+/g, '_').toLowerCase(),
        transform: (value) => value.trim(),
      });
    });
  }
}
