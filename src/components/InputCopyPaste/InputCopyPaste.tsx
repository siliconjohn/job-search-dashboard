import { Input, Button, Space, Form } from 'antd'; 
import type { EntrieType } from '../../types'; 

const InputCopyPaste = ( { form, label, valueName } ) => {   
    
    const pasteToField = async ( fieldName: keyof EntrieType) => {
        try {
            const text = await navigator.clipboard.readText();
            const trimmed = text.trim();
            form.setFieldsValue({ [fieldName]: trimmed });
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
