import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  RENT_START_OR_END_IS_WEEKEND_MESSAGE,
  RENT_TIME_IS_INVALID_MESSAGE,
} from '../src/constants';

describe('RentSessionController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // cost tests

  describe('rent-session/cost (GET)', () => {
    it('1(start date is weekend)', () => {
      const parametrs = {
        dateStartPeriod: '09-03-2023',
        dateEndPeriod: '09-12-2023',
      };
      const result = {
        status: 400,
        response: {
          statusCode: 400,
          message: RENT_START_OR_END_IS_WEEKEND_MESSAGE,
        },
      };
      return request(app.getHttpServer())
        .get(
          `/rent-session/cost?dateStartPeriod=${parametrs.dateStartPeriod}&dateEndPeriod=${parametrs.dateEndPeriod}`,
        )
        .expect(result.status)
        .expect(result.response);
    });

    it('2(end date is weekend)', () => {
      const parametrs = {
        dateStartPeriod: '09-04-2023',
        dateEndPeriod: '09-23-2023',
      };
      const result = {
        status: 400,
        response: {
          statusCode: 400,
          message: RENT_START_OR_END_IS_WEEKEND_MESSAGE,
        },
      };
      return request(app.getHttpServer())
        .get(
          `/rent-session/cost?dateStartPeriod=${parametrs.dateStartPeriod}&dateEndPeriod=${parametrs.dateEndPeriod}`,
        )
        .expect(result.status)
        .expect(result.response);
    });

    it('3(valid test)', () => {
      const parametrs = {
        dateStartPeriod: '09-04-2023',
        dateEndPeriod: '09-12-2023',
      };
      const result = {
        status: 200,
        response: '8750',
      };
      return request(app.getHttpServer())
        .get(
          `/rent-session/cost?dateStartPeriod=${parametrs.dateStartPeriod}&dateEndPeriod=${parametrs.dateEndPeriod}`,
        )
        .expect(result.status)
        .expect(result.response);
    });

    it('4(rent period invalid)', () => {
      const parametrs = {
        dateStartPeriod: '08-04-2023',
        dateEndPeriod: '09-12-2023',
      };
      const result = {
        status: 400,
        response: {
          statusCode: 400,
          message: RENT_TIME_IS_INVALID_MESSAGE,
        },
      };
      return request(app.getHttpServer())
        .get(
          `/rent-session/cost?dateStartPeriod=${parametrs.dateStartPeriod}&dateEndPeriod=${parametrs.dateEndPeriod}`,
        )
        .expect(result.status)
        .expect(result.response);
    });
  });

  // is-available tests

  describe('rent-session/is_available (GET)', () => {
    it('1(start in exist rent session)', () => {
      const parametrs = {
        dateStartPeriod: '09-15-2023',
        dateEndPeriod: '09-29-2023',
        carId: 1234,
      };
      const result = {
        status: 200,
        response: 'false',
      };
      return request(app.getHttpServer())
        .get(
          `/rent-session/is-available?dateStartPeriod=${parametrs.dateStartPeriod}&dateEndPeriod=${parametrs.dateEndPeriod}&carId=${parametrs.carId}`,
        )
        .expect(result.status)
        .expect(result.response);
    });

    it('2(end in exist rent session)', () => {
      const parametrs = {
        dateStartPeriod: '09-01-2023',
        dateEndPeriod: '09-22-2023',
        carId: 123,
      };
      const result = {
        status: 200,
        response: 'false',
      };
      return request(app.getHttpServer())
        .get(
          `/rent-session/is-available?dateStartPeriod=${parametrs.dateStartPeriod}&dateEndPeriod=${parametrs.dateEndPeriod}&carId=${parametrs.carId}`,
        )
        .expect(result.status)
        .expect(result.response);
    });

    it('3(exist session period is in new session period)', () => {
      const parametrs = {
        dateStartPeriod: '09-01-2023',
        dateEndPeriod: '09-29-2023',
        carId: 123,
      };
      const result = {
        status: 200,
        response: 'false',
      };
      return request(app.getHttpServer())
        .get(
          `/rent-session/is-available?dateStartPeriod=${parametrs.dateStartPeriod}&dateEndPeriod=${parametrs.dateEndPeriod}&carId=${parametrs.carId}`,
        )
        .expect(result.status)
        .expect(result.response);
    });

    it('4(valid test)', () => {
      const parametrs = {
        dateStartPeriod: '09-01-2023',
        dateEndPeriod: '09-03-2023',
        carId: 123,
      };
      const result = {
        status: 200,
        response: 'true',
      };
      return request(app.getHttpServer())
        .get(
          `/rent-session/is-available?dateStartPeriod=${parametrs.dateStartPeriod}&dateEndPeriod=${parametrs.dateEndPeriod}&carId=${parametrs.carId}`,
        )
        .expect(result.status)
        .expect(result.response);
    });
  });

  describe('rent-session/report (GET)', () => {
    it('1(Month with rent sessions)', () => {
      const parametrs = {
        dateStartPeriod: '09-01-2023',
        dateEndPeriod: '09-30-2023',
      };
      const result = {
        status: 200,
        response: [
          {
            carId: 123,
            usage: '50',
          },
          {
            carId: 1234,
            usage: '83',
          },
        ],
      };
      return request(app.getHttpServer())
        .get(
          `/rent-session/report?dateStartPeriod=${parametrs.dateStartPeriod}&dateEndPeriod=${parametrs.dateEndPeriod}`,
        )
        .expect(result.status)
        .expect(result.response);
    });

    it('2(Random period with rent sessions)', () => {
      const parametrs = {
        dateStartPeriod: '08-01-2023',
        dateEndPeriod: '09-30-2023',
      };
      const result = {
        status: 200,
        response: [
          {
            carId: 123,
            usage: '24',
          },
          {
            carId: 1234,
            usage: '40',
          },
        ],
      };
      return request(app.getHttpServer())
        .get(
          `/rent-session/report?dateStartPeriod=${parametrs.dateStartPeriod}&dateEndPeriod=${parametrs.dateEndPeriod}`,
        )
        .expect(result.status)
        .expect(result.response);
    });
  });

  describe('rent-session/report-by-month (GET)', () => {
    it('1(Month with rent sessions)', () => {
      const parametrs = {
        month: 9,
        year: 2023,
      };
      const result = {
        status: 200,
        response: [
          {
            carId: 123,
            usage: '50',
          },
          {
            carId: 1234,
            usage: '83',
          },
        ],
      };
      return request(app.getHttpServer())
        .get(
          `/rent-session/report-by-month?month=${parametrs.month}&year=${parametrs.year}`,
        )
        .expect(result.status)
        .expect(result.response);
    });

    it('2(Month without rent sessions)', () => {
      const parametrs = {
        month: 9,
        year: 2022,
      };
      const result = {
        status: 200,
        response: [],
      };
      return request(app.getHttpServer())
        .get(
          `/rent-session/report-by-month?month=${parametrs.month}&year=${parametrs.year}`,
        )
        .expect(result.status)
        .expect(result.response);
    });
  });
});
