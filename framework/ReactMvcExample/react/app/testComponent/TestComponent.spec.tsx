import { render, fireEvent } from '@testing-library/react';
import TestComponent from './example';
import { expect, jest, test, describe, it } from '@jest/globals';
import React from 'react';

jest.mock('axios');

describe('TestComponent', () => {
    it('changes name value on text field change', async () => {
        const initialProps = {
            Name: 'Test',
            InitialComments: [],
            Page: 1
        };

        const { getByLabelText, getByText } = render(<TestComponent {...initialProps} />);
        const inputElement = getByLabelText('Standard');
        fireEvent.change(inputElement, { target: { value: 'New Test' } });

        expect(getByText('Hello from Component, New Test!')).toBeTruthy();
    });

    it('handles _alertClicked correctly', async () => {
        const initialProps = {
            Name: 'Test',
            InitialComments: [],
            Page: 1
        };

        const commentsResult = {
            comments: [{ Author: { Name: 'Author', GithubUsername: 'username' }, Text: 'Comment' }],
            text: 'Test Text',
            hasMore: true
        };

        const { getByText } = render(<TestComponent {...initialProps} />);
        const buttonElement = getByText('Click Me!...');
        fireEvent.click(buttonElement);
    });
});
