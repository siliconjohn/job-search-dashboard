import { Radio, Form } from 'antd'; 
import type { EntryKind, Entry } from '../../types/entryTypes';

const kindOptions: EntryKind['kind'][] = ['Application', 'Note', 'Contact', 'Other'];

const options = kindOptions.map(kind => ({
    label: kind,            
    value: kind,
}));

interface EntryKindExampleProps {  
    valueName: keyof Entry;
}

const EntryKindExample = ( { valueName }: EntryKindExampleProps ) => (
    <Form.Item
        name={ valueName }
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
