import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class parseIdPipe implements PipeTransform<string, number> {
  transform(value: any, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) throw new BadRequestException('Id must be a number');
    if (val <= 0) throw new BadRequestException('Id must be positive');

    return val;
  }
}
