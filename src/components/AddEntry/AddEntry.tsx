import { Button, Form } from 'antd'; 
import type { EntrieType } from '../../types'; 
import { useEntriesStore } from '../../stores/entriesStore';
import InputCopyPaste from '../InputCopyPaste/InputCopyPaste';

const AddEntry: React.FC = () => {
    const [ form ] = Form.useForm();
    const { addEntry } = useEntriesStore();
 
    const onFinish = ( values: EntrieType ) => {    
        addEntry( { 
                ...values, 
                createdAt: new Date(), 
                key: Math.random().toString().slice(2, 12)
            } 
        );
        
        form.resetFields();
    };
 
    return (
        <>
            <Form
                form={ form }
                onFinish={ onFinish }
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 12 }}
                initialValues={{ name: '', url: '' }}
            >   
                <InputCopyPaste 
                    form={ form }
                    label="Name"
                    valueName={ "name" }
                />

                <InputCopyPaste 
                    form={ form }
                    label="URL"
                    valueName={ "url" }
                />
                
                <Button 
                    type="primary" 
                    htmlType="submit"
                >
                    Submit
                </Button>
            </Form> 
        </>
    )
}  

export default AddEntry;
