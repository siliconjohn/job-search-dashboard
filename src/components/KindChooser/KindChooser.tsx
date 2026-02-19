import { Radio, Form } from 'antd'; 
import type { EntryKind, EntrieType } from '../../types';

const kindOptions: EntryKind['kind'][] = ['Application', 'Note', 'Contact', 'Other'];

const options = kindOptions.map(kind => ({
    label: kind,            
    value: kind,
}));

interface EntryKindExampleProps {  
    valueName: keyof EntrieType;
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
