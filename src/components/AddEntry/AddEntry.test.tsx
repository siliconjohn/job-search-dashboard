import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Input } from 'antd';
import AddEntry from './AddEntry';

const mockAddEntry = vi.fn();

vi.mock('../../stores/entriesStore', () => ({
    useEntriesStore: () => ({
        addEntry: mockAddEntry,
    }),
}));

vi.mock('../../utils/sanitizers', () => ({
    sanitizeText: (v: string) => v.trim(),
    sanitizeUrl: (v: string) => v.trim(),
}));

vi.mock('../../types/entryTypes', () => ({
    sanitizeKind: (v: string) => v,
}));

vi.mock('../InputCopyPaste/InputCopyPaste', () => ({
    default: ({ label, valueName }: { label: string; valueName: string }) => (
        <Form.Item name={valueName} label={label}>
            <Input data-testid={`input-${valueName}`} />
        </Form.Item>
    ),
}));

vi.mock('../KindChooser/KindChooser', () => ({
    default: ({ valueName }: { valueName: string }) => (
        <div data-testid={`kind-chooser-${valueName}`}>KindChooser</div>
    ),
}));

vi.stubGlobal('crypto', {
    randomUUID: () => 'test-uuid-1234',
});

describe('AddEntry', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the card title', () => {
        render(<AddEntry />);
        expect(screen.getByText('Add Entry')).toBeInTheDocument();
    });

    it('renders all input fields', () => {
        render(<AddEntry />);
        expect(screen.getByTestId('input-company')).toBeInTheDocument();
        expect(screen.getByTestId('input-position')).toBeInTheDocument();
        expect(screen.getByTestId('input-url')).toBeInTheDocument();
        expect(screen.getByTestId('input-note')).toBeInTheDocument();
    });

    it('renders the KindChooser component', () => {
        render(<AddEntry />);
        expect(screen.getByTestId('kind-chooser-kind')).toBeInTheDocument();
    });

    it('renders the Save button', () => {
        render(<AddEntry />);
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });

    it('calls addEntry with sanitized values and generated fields on submit', async () => {
        const user = userEvent.setup();
        render(<AddEntry />);

        await user.type(screen.getByTestId('input-company'), 'Acme Corp');
        await user.type(screen.getByTestId('input-position'), 'Engineer');
        await user.type(screen.getByTestId('input-url'), 'https://acme.com');
        await user.type(screen.getByTestId('input-note'), 'Great place');

        await user.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(mockAddEntry).toHaveBeenCalledOnce();
        });

        const calledWith = mockAddEntry.mock.calls[0][0];
        expect(calledWith.company).toBe('Acme Corp');
        expect(calledWith.position).toBe('Engineer');
        expect(calledWith.url).toBe('https://acme.com');
        expect(calledWith.note).toBe('Great place');
        expect(calledWith.key).toBe('test-uuid-1234');
        expect(typeof calledWith.createdAt).toBe('string');
        expect(() => new Date(calledWith.createdAt).toISOString()).not.toThrow();
    });

    it('resets the form fields after successful submission', async () => {
        const user = userEvent.setup();
        render(<AddEntry />);

        await user.type(screen.getByTestId('input-company'), 'Some Company');
        await user.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(mockAddEntry).toHaveBeenCalledOnce();
        });

        await waitFor(() => {
            expect(screen.getByTestId('input-company')).toHaveValue('');
        });
    });

    it('does not call addEntry when required fields are missing (if validation is set)', async () => {
        // This test is a placeholder for when required validators are added to the form.
        // Currently the form has no required rules, so submission always proceeds.
        const user = userEvent.setup();
        render(<AddEntry />);

        await user.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            // With no required fields, addEntry should still be called
            expect(mockAddEntry).toHaveBeenCalledOnce();
        });
    });

    it('passes sanitized (trimmed) values to addEntry', async () => {
        const user = userEvent.setup();
        render(<AddEntry />);

        await user.type(screen.getByTestId('input-company'), '  Trimmed  ');

        await user.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(mockAddEntry).toHaveBeenCalledOnce();
        });

        const calledWith = mockAddEntry.mock.calls[0][0];
        expect(calledWith.company).toBe('Trimmed');
    });
});
