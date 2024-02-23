import { BatchCodeService } from './batchcodeDecodingLogic';
import { DecodeResult } from './DecodeResult';
import { BatchCodeDecoder } from './decoder'; // Adjust this import path as necessary
import { CreateBatchCodeDecoderDto } from '../../batch-code-decoder/dto/create-batch-code-decoder.dto';

jest.mock('./decoder'); // Mock the BatchCodeDecoder class

describe('BatchCodeService', () => {
    let batchCodeService: BatchCodeService;
    let mockDecodeParlux: jest.Mock;
    let mockDecodeSchwarzkopf: jest.Mock;
    let mockDecodeNivea: jest.Mock;

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        mockDecodeParlux = jest.fn();
        mockDecodeSchwarzkopf = jest.fn();
        mockDecodeNivea = jest.fn();

        // Mock the implementation of decode methods
        BatchCodeDecoder.prototype.decodeParlux = mockDecodeParlux;
        BatchCodeDecoder.prototype.decodeSchwarzkopf = mockDecodeSchwarzkopf;
        BatchCodeDecoder.prototype.decodeNivea = mockDecodeNivea;

        batchCodeService = new BatchCodeService();
    });

    it('should be defined', () => {
        expect(batchCodeService).toBeDefined();
    });

    describe('decodeBatch', () => {
        it('decodes batch codes using specific brand decoders', async () => {
            const mockResult: DecodeResult = {
                year: 2022, month: 6, day: 9, output: "Manufacturing Date: June 9, 2022", usedFallback: false
            };
            mockDecodeParlux.mockResolvedValue(JSON.stringify(mockResult));

            const item : CreateBatchCodeDecoderDto = {
                brand: 'billie-eilish', batchCode: '22160',
                brandId: '',
                productType: ''
            };
            await expect(batchCodeService.decodeBatch(item)).resolves.toEqual(mockResult);

            expect(mockDecodeParlux).toHaveBeenCalledWith('22160');
        });

        it('falls back to smartDecoderLookup if no specific brand decoder is provided', async () => {
            const mockFallbackResult: DecodeResult = {
                output: "No valid decoder found for this batch code", usedFallback: true
            };
            // Mocking as if none of the decoders could handle the given code
            mockDecodeParlux.mockRejectedValue(new Error("Invalid batch code"));
            mockDecodeSchwarzkopf.mockRejectedValue(new Error("Invalid batch code"));
            mockDecodeNivea.mockRejectedValue(new Error("Invalid batch code"));

            const item: CreateBatchCodeDecoderDto = {
                batchCode: 'unknownCode',
                brand: '',
                brandId: '',
                productType: ''
            };
            await expect(batchCodeService.decodeBatch(item)).resolves.toEqual(mockFallbackResult);
        });
    });

    describe('bulkDecodeBatch', () => {
        it('processes multiple batch codes in parallel', async () => {
            const mockResults: DecodeResult[] = [
                { year: 2022, month: 6, output: "Manufacturing Date: June, 2022", usedFallback: false },
                { output: "No valid decoder found for this batch code", usedFallback: true }
            ];

            mockDecodeNivea.mockResolvedValueOnce(JSON.stringify(mockResults[0]));
            mockDecodeParlux.mockRejectedValue(new Error("Invalid batch code")); // Assume the second code falls back

            const batchCodes: CreateBatchCodeDecoderDto[] = [
                { brand: 'Nivea', batchCode: '22160', brandId: '', productType: ''},
                { batchCode: 'unknownCode', brand: '', brandId: '', productType: ''}
            ];

            await expect(batchCodeService.bulkDecodeBatch(batchCodes)).resolves.toEqual(mockResults);

            expect(mockDecodeNivea).toHaveBeenCalledWith('22160');
            // Ensure the fallback mechanism was invoked for the second code
        });
    });
});
