/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../status.enum';

export class TaskStatusValiationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ];
  transform(value: any): any {
    value = value.toUpperCase();
    console.log(value);
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is INVALID STATUS`);
    }
    return value;
  }
  private isStatusValid(status: any): boolean {
    const index = this.allowedStatus.indexOf(status);
    return index !== -1;
  }
}
