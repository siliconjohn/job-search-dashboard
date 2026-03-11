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
    contact: '',
    kind: 'Application',   
}

const sanitizeValues = (values: Entry): Entry => ({
    ...values,
    company: sanitizeText(values.company ?? ''),
    position: sanitizeText(values.position ?? ''),
    url: sanitizeUrl(values.url ?? ''),
    note: sanitizeText(values.note ?? ''),
    contact: sanitizeText(values.contact ?? ''),
    kind: sanitizeKind(values.kind),
});

const AddEntry: React.FC = () => {
    const [ form ] = Form.useForm();
    const { addEntry } = useEntriesStore();

    const onFinish = ( values: Entry ) => {
        const sanitized = sanitizeValues(values);

        addEntry( { 
            ...sanitized, 
            dead: false,
            createdAt: new Date().toISOString(), 
            key: crypto.randomUUID()
        } 
        );

        form.resetFields();
    };

    return (
        <Card
            title={<span className="text-slate-900 font-semibold">Add Entry</span>}
            className="bg-slate-900/60 border border-slate-800 rounded-xl shadow-sm"
        >
            <Form
                form={ form }
                onFinish={ onFinish }
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValues={ initialValues }
                className="[&_.ant-form-item-label>label]:!text-slate-900 [&_.ant-input]:!border-slate-700 [&_.ant-input]:!text-slate-900 [&_.ant-input]:placeholder:!text-slate-500"
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

                <InputCopyPaste 
                    form={ form }
                    label="Contact"
                    valueName={ "contact" }
                />
                
                <EntryKindExample  
                    valueName={ "kind" }
                />
                
                <Form.Item label={null} style={{ marginBottom: 0 }}>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        className="!bg-emerald-500 !border-emerald-400 hover:!bg-emerald-400 hover:!border-emerald-300"
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form> 
        </Card>
    )
}  

export default AddEntry;