import { Radio, Form } from 'antd';
import { ENTRY_KINDS } from '../../types/entryTypes';

const options = ENTRY_KINDS.map(kind => ({
    label: kind,
    value: kind,
}));

interface EntryKindChooserProps {
    valueName: string;  
}

const EntryKindChooser = ({ valueName }: EntryKindChooserProps) => (
    <Form.Item 
        name={valueName} 
        label={null}
    >
        <Radio.Group
            block
            options={options}
            optionType="button"
        />
    </Form.Item>
);

export default EntryKindChooser;