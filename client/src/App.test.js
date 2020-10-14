import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

import App from './App';

describe('<App /> - ', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ time: new Date() })
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders <Header />', async () => {
    const { getByText } = render(<App />);
    await act(() => Promise.resolve()); // When the component mounts, the useEffect is fired, so we need to use act to flush state updates

    const headerElem = getByText(/Welcome to Flask/i);
    expect(headerElem).toBeInTheDocument();
  });

  test('passes fetchTime', async () => {
    const { queryByText, getByText } = render(<App />);
    await act(() => Promise.resolve());

    const serverTimePara = queryByText(/Server time/i);
    // screen.debug(screen.getByText(/Server time/i)); // This is how to debug (print element)
    expect(serverTimePara).toBeTruthy();
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('/current-time');
  });

  test('passes fetchTime (api error)', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'errorText'
      })
    );

    const { queryByText, getByText } = render(<App />);
    await act(() => Promise.resolve());

    const errorPara = queryByText(/error/i);
    expect(errorPara.textContent).toEqual('errorText');
  });
});
