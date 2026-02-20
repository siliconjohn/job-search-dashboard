import { Button, Card, Form } from 'antd'; 
import { type Entry, sanitizeKind } from '../../types/entryTypes'; 
import { useEntriesStore } from '../../stores/entriesStore';
import InputCopyPaste from '../InputCopyPaste/InputCopyPaste';
import EntryKindExample from '../KindChooser/KindChooser';
import { sanitizeText, sanitizeUrl} from '../../utils/sanitizers';

const initialValues={
    company: '',
    position: '',
    url: '',
    note: '',
    kind: 'Application',   
}

const sanitizeValues = (values: Entry): Entry => ({
    ...values,
    company: sanitizeText(values.company ?? ''),
    position: sanitizeText(values.position ?? ''),
    url: sanitizeUrl(values.url ?? ''),
    note: sanitizeText(values.note ?? ''),
    kind: sanitizeKind(values.kind),
});

const AddEntry: React.FC = () => {
    const [ form ] = Form.useForm();
    const { addEntry } = useEntriesStore();

    const onFinish = ( values: Entry ) => {
        const sanitized = sanitizeValues(values);

        addEntry( { 
            ...sanitized, 
            createdAt: new Date().toISOString(), 
            key: crypto.randomUUID()
        } 
        );

        form.resetFields();
    };

    return (
        <Card title="Add Entry" style={{ marginBottom: 24 }}>
            <Form
                form={ form }
                onFinish={ onFinish }
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 12 }}
                initialValues={ initialValues }
            >   
                <InputCopyPaste 
                    form={ form }
                    label="Company"
                    valueName={ "company" }
                />
                
                <InputCopyPaste 
                    form={ form }
                    label="Position"
                    valueName={ "position" }
                />

                <InputCopyPaste 
                    form={ form }
                    label="URL"
                    valueName={ "url" }
                />

                <InputCopyPaste 
                    form={ form }
                    label="Note"
                    valueName={ "note" }
                />
                
                <EntryKindExample  
                    valueName={ "kind" }
                />
                
                <Form.Item label={null} style={{ marginBottom: 0 }}>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form> 
        </Card>
    )
}  

export default AddEntry;