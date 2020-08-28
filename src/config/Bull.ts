import { Injectable } from "@nestjs/common";
import { BullOptionsFactory, BullModuleOptions } from "@nestjs/bull";
import Redis from "@config/Redis";

@Injectable()
export class BullConfig implements BullOptionsFactory {
  createBullOptions(): BullModuleOptions {
    return {
      redis: Redis,
    };
  }
}