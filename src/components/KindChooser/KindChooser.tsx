import { Radio, Form } from 'antd';
import { ENTRY_KINDS } from '../../types/entryTypes';

const options = ENTRY_KINDS.map(kind => ({
    label: kind,
    value: kind,
}));

interface EntryKindExampleProps {
    valueName: string;  
}

const EntryKindExample = ({ valueName }: EntryKindExampleProps) => (
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

export default EntryKindExample;