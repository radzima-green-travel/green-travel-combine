import { RequestError } from 'core/errors';
import { getRequestErrorLabels } from '../getRequestErrorLabels';

const errorDefaultTextTranslationKey = 'common:errors.default.text';
const errorDefaultTitleTranslationKey = 'common:errors.default.title';

describe('getRequestErrorLabels', () => {
  it('should return common labels if no status and error code', () => {
    expect(getRequestErrorLabels({} as RequestError, 'home')).toEqual({
      textLabels: [errorDefaultTextTranslationKey],
      titleLabels: [errorDefaultTitleTranslationKey],
    });
  });

  it('should return status labels with common if status exist', () => {
    expect(
      getRequestErrorLabels({ status: 300 } as RequestError, 'home'),
    ).toEqual({
      textLabels: [
        'home:errors.300.text',
        'common:errors.300.text',
        errorDefaultTextTranslationKey,
      ],
      titleLabels: [
        'home:errors.300.title',
        'common:errors.300.title',
        errorDefaultTitleTranslationKey,
      ],
    });
  });

  it('should return status and error code and common labels', () => {
    expect(
      getRequestErrorLabels(
        {
          status: 300,
          error_code: 'out_of_stock',
        } as unknown as RequestError,
        'home',
      ),
    ).toEqual({
      textLabels: [
        'home:errors.300.out_of_stock.text',
        'common:errors.300.out_of_stock.text',
        'home:errors.300.text',
        'common:errors.300.text',
        errorDefaultTextTranslationKey,
      ],
      titleLabels: [
        'home:errors.300.out_of_stock.title',
        'common:errors.300.out_of_stock.title',
        'home:errors.300.title',
        'common:errors.300.title',
        errorDefaultTitleTranslationKey,
      ],
    });
  });
});
