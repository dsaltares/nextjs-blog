import { render } from '@testing-library/react';
import FormattedDate from './date';

describe('FormattedDate', () => {
  it('correctly formats date', () => {
    const dateString = '2020-01-01';
    const { getByText } = render(<FormattedDate dateString={dateString} />);
    getByText('January 1, 2020');
  });
});
