import { Input, Button, Form } from 'antd'; 
import type { EntrieType } from '../../types'; 

const AddEntry: React.FC = () => {
    const [ formController ] = Form.useForm();
    
    const onFinish = ( values: EntrieType ) => {
        const savedEntries = JSON.parse( localStorage.getItem('entries') ?? '' ); 

        const merged = [ ...savedEntries, 
            { 
                ...values, 
                createdAt: new Date(), 
                key: Math.random().toString().slice(2, 12)
            } 
        ]
        localStorage.setItem('entries', JSON.stringify(merged));
        formController.resetFields();
    };
    
    return (
        <>
            <Form
                form={ formController }
                onFinish={ onFinish }
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 12 }}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="Name"
                     name="name"
                >
                    <Input></Input>
                </Form.Item>

                <Form.Item 
                    label="Url"
                     name="url"
                >
                    <Input></Input>
                </Form.Item>
            
                <Form.Item  >
                    <Button 
                        type="primary" 
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form> 
        </>
    )
}  

export default AddEntry;
