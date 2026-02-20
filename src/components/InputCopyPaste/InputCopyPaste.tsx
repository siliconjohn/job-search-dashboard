import { Input, Button, Space, Form } from 'antd'; 
import type { EntryType } from '../../types/entryTypes'; 
import type { FormInstance } from 'antd';

interface InputCopyPasteProps {
    form: FormInstance;
    label: string;
    valueName: keyof EntryType;
}

const InputCopyPaste = ( { form, label, valueName } : InputCopyPasteProps ) => {   
    
    const pasteToField = async ( fieldName: keyof EntryType) => {
        try {
            const text = await navigator.clipboard.readText(); 
            form.setFieldsValue({ [fieldName]: text.trim() });
        } catch (err) {
            console.error('Failed to read clipboard:', err);
        }
    };
        
    return (
        <Form.Item label={ label }>
            <Space.Compact style={{ width: '100%' }}>
                <Form.Item
                    name={ valueName }
                    noStyle
                >
                    <Input />
                </Form.Item>

                <Button
                    type="primary"
                    onClick={() => pasteToField(valueName)}
                >
                    Paste
                </Button>
            </Space.Compact>
        </Form.Item>
    )
}  

export default InputCopyPaste;
