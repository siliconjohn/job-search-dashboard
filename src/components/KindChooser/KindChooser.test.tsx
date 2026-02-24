import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from 'antd';
import EntryKindExample from './KindChooser';
import { ENTRY_KINDS } from '../../types/entryTypes';

const Wrapper = ({ valueName = 'kind', initialValue = 'Application' } = {}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} initialValues={{ [valueName]: initialValue }}>
            <EntryKindExample valueName={valueName} />
        </Form>
    );
};

describe('KindChooser', () => {
    it('renders a radio button for each entry kind', () => {
        render(<Wrapper />);

        ENTRY_KINDS.forEach(kind => {
            expect(screen.getByRole('radio', { name: kind })).toBeInTheDocument();
        });
    });

    it('renders the correct number of options', () => {
        render(<Wrapper />);

        const radios = screen.getAllByRole('radio');
        expect(radios).toHaveLength(ENTRY_KINDS.length);
    });

    it('reflects the initial form value as checked', () => {
        render(<Wrapper initialValue="Note" />);

        expect(screen.getByRole('radio', { name: 'Note' })).toBeChecked();
    });

    it('selects a radio button when clicked', async () => {
        const user = userEvent.setup();
        render(<Wrapper />);

        await user.click(screen.getByText('Contact'));

        expect(screen.getByRole('radio', { name: 'Contact' })).toBeChecked();
    });

    it('unchecks the previously selected option when a new one is clicked', async () => {
        const user = userEvent.setup();
        render(<Wrapper initialValue="Application" />);

        expect(screen.getByRole('radio', { name: 'Application' })).toBeChecked();

        await user.click(screen.getByText('Other'));

        expect(screen.getByRole('radio', { name: 'Other' })).toBeChecked();
        expect(screen.getByRole('radio', { name: 'Application' })).not.toBeChecked();
    });

    it('only ever has one option checked at a time', async () => {
        const user = userEvent.setup();
        render(<Wrapper />);

        for (const kind of ENTRY_KINDS) {
            await user.click(screen.getByText(kind));
            const checked = screen.getAllByRole('radio').filter(r => (r as HTMLInputElement).checked);
            expect(checked).toHaveLength(1);
        }
    });

    it('works with a custom valueName prop', () => {
        render(<Wrapper valueName="entryType" />);

        ENTRY_KINDS.forEach(kind => {
            expect(screen.getByRole('radio', { name: kind })).toBeInTheDocument();
        });
    });
});