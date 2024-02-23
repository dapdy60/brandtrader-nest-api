import { Test, TestingModule } from '@nestjs/testing';
import { BatchCodeDecoder } from './decoder';

describe('BatchCodeDecoder', () => {
  let decoder: BatchCodeDecoder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatchCodeDecoder],
    }).compile();

    decoder = module.get<BatchCodeDecoder>(BatchCodeDecoder);
  });

  it('should be defined', () => {
    expect(decoder).toBeDefined();
  });

  describe('decodeSchwarzkopf', () => {
    it('should decode valid Schwarzkopf codes correctly', () => {
      const result = JSON.parse(decoder.decodeSchwarzkopf("0929X06926"));
      expect(result).toEqual({
        year: 2020,
        month: 10,
        day: 29,
        output: "Manufacturing Date: October 29, 2020"
      });
    });

    it('should return error message for invalid Schwarzkopf codes', () => {
      const result = JSON.parse(decoder.decodeSchwarzkopf("invalid"));
      expect(result.output).toBe("Invalid batch code");
    });
  });

  describe('decodeNivea', () => {
    //Todo : Fix as per check fresh
    it('should decode valid Nivea codes correctly', () => {
      const result = JSON.parse(decoder.decodeNivea("84213310"));
      expect(result).toEqual({
        year: 2018,
        month: 10,
        day: 16,
        output: "Manufacturing Date: October 16, 2018"
      });
    });

    it('should return error message for invalid Nivea codes', () => {
      const result = JSON.parse(decoder.decodeNivea("invalid"));
      expect(result.output).toBe("Invalid batch code");
    });
  });

  describe('decodeLOreal', () => {
    it('should decode valid L\'Oreal codes correctly', () => {
      const result = JSON.parse(decoder.decodeLOreal("38U60OG"));
      expect(result).toEqual({
        year: 2021,
        month: 6,
        output: "Manufacturing Date: June 2021"
      });
    });

    it('should return error message for invalid L\'Oreal codes', () => {
      const result = JSON.parse(decoder.decodeLOreal("invalid"));
      expect(result.output).toBe("Invalid batch code");
    });
  });

  describe('decodeCoty', () => {
    it('should decode valid Coty codes correctly', () => {
      const result = JSON.parse(decoder.decodeCoty("0275"));
      expect(result).toEqual({
        year: 2020,
        month: 10,
        day: 1,
        output: "Manufacturing Date: October 1, 2020"
      });
    });

    it('should return error message for invalid Coty codes', () => {
      const result = JSON.parse(decoder.decodeCoty("invalid"));
      expect(result.output).toBe("Invalid batch code");
    });
  });

  describe('decodeEsteeLauder', () => {
    it('should decode valid Estee Lauder codes correctly', () => {
      const result = JSON.parse(decoder.decodeEsteeLauder("C79"));
      expect(result).toEqual({
        year: 2019,
        month: 7,
        output: "Manufacturing Date: July, 2019"
      });
    });

    it('should return error message for invalid Estee Lauder codes', () => {
      const result = JSON.parse(decoder.decodeEsteeLauder("invalid"));
      expect(result.output).toBe("Invalid batch code");
    });
  });

  describe('decodePalmolive', () => {
    //Todo : fix as per check fresh
    it('should decode valid Palmolive codes correctly', () => {
      const result = JSON.parse(decoder.decodePalmolive("2023410"));
      expect(result).toEqual({
        year: 2022,
        month: 1,
        day: 23,
        output: "Manufacturing Date: January 23, 2022"
      });
    });

    it('should return error message for invalid Palmolive codes', () => {
      const result = JSON.parse(decoder.decodePalmolive("invalid"));
      expect(result.output).toBe("Invalid batch code 2");
    });
  });

  describe('decodeParlux', () => {
    //Todo: Fix the result like check fresh
    it('should decode valid Parlux codes correctly', () => {
      const result = JSON.parse(decoder.decodeParlux("16327ra"));
      expect(result).toEqual({
        year: 2016,
        month: 11, // Assuming "27ra" leads to November based on day-of-year calculation
        day: 22,
        output: "Manufacturing Date: November 22, 2016"
      });
    });
  
    it('should return error message for invalid Parlux codes', () => {
      const result = JSON.parse(decoder.decodeParlux("invalid"));
      expect(result.output).toBe("Invalid batch code");
    });
  });
  
  describe('decodeUnilever', () => {
    it('should decode valid Unilever codes correctly', () => {
      const result = JSON.parse(decoder.decodeUnilever("12661"));
      expect(result).toEqual({
        year: 2021,
        month: 9,
        day: 23,
        output: "Manufacturing Date: September 23, 2021"
      });
    });
  
    it('should return error message for invalid Unilever codes', () => {
      const result = JSON.parse(decoder.decodeUnilever("invalid"));
      expect(result.output).toBe("Invalid batch code");
    });
  });
  
  describe('decodeRevlon', () => {
    it('should decode valid Revlon codes correctly', () => {
      const result = JSON.parse(decoder.decodeRevlon("Y21921A"));
      expect(result).toEqual({
        year: 2021,
        month: 9,
        day: 21,
        output: "Manufacturing Date: September 21, 2021"
      });
    });
  
    it('should return error message for invalid Revlon codes', () => {
      const result = JSON.parse(decoder.decodeRevlon("invalid"));
      expect(result.output).toBe("Invalid batch code");
    });
  });
  
  describe('decodeShiseido', () => {
    it('should decode valid Shiseido codes correctly', () => {
      const result = JSON.parse(decoder.decodeShiseido("7229MM"));
      expect(result).toEqual({
        year: 2017,
        month: 8, // Assuming "29MM" leads to August based on day-of-year calculation
        day: 17,
        output: "Manufacturing Date: August 17, 2017"
      });
    });
  
    it('should return error message for invalid Shiseido codes', () => {
      const result = JSON.parse(decoder.decodeShiseido("invalid"));
      expect(result.output).toBe("Invalid batch code");
    });
  });
  
  describe('decodeNeutrogena', () => {
    it('should decode valid Neutrogena codes correctly', () => {
      const result = JSON.parse(decoder.decodeNeutrogena("2310VA"));
      expect(result).toEqual({
        year: 2020,
        month: 8,
        day: 18,
        output: "Manufacturing Date: August 18, 2020"
      });
    });
  
    it('should return error message for invalid Neutrogena codes', () => {
      const result = JSON.parse(decoder.decodeNeutrogena("invalid"));
      expect(result.output).toBe("Invalid batch code");
    });
  });
  
  describe('decodeClarins', () => {
    it('should decode valid Clarins codes correctly', () => {
      const result = JSON.parse(decoder.decodeClarins("0024014"));
      expect(result).toEqual({
        year: 2020,
        month: 6,
        day: 8,
        output: "Manufacturing Date: June 8, 2020"
      });
    });
  
    it('should return error message for invalid Clarins codes', () => {
      const result = JSON.parse(decoder.decodeClarins("invalid"));
      expect(result.output).toBe("Invalid batch code");
    });
  });
  



});
