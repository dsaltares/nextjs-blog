import fs from 'fs';
import { getAllPostIds } from './posts';

jest.mock('fs');

describe('getAllPostIds', () => {
  it('returns post ids', async () => {
    fs.readdirSync.mockReturnValue(['pre-rendering.md', 'ssg-ssr.md']);

    const ids = getAllPostIds();

    expect(ids).toEqual([
      {
        params: {
          id: 'pre-rendering',
        },
      },
      {
        params: {
          id: 'ssg-ssr',
        },
      },
    ]);
  });
});
