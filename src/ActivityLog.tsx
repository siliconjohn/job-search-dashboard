import { useState, useEffect } from 'react';
import { Input, List, Button, Form } from 'antd';
import type { LogType } from './types';
import type { EntrieType, ActivityListType } from './types';
import ActivityList from './components/ActivityList/ActivityList';

const ActivityLog: React.FC<LogType> = ( { name } ) => {
    const [ formController ] = Form.useForm();
    const [ entries, setEntries ] = useState<EntrieType[]>( () => {
    	const saved = localStorage.getItem('entries');  
			if (saved) {
				try {
						return( JSON.parse(saved) );
				} catch (e) {
						console.error('Failed to parse entries from localStorage', e);
						
				}
			}
			return [];
    } );  
 
    const onFinish = ( values: EntrieType ) => {
        setEntries( [ ...entries, 
            { 
                ...values, 
                createdAt: new Date(), 
                key: Math.random().toString().slice(2, 12)
            } 
        ] );

        formController.resetFields();
    };
    
    useEffect(() => {
        localStorage.setItem('entries', JSON.stringify(entries));
    }, [entries]);
    
    useEffect(() => {
        
    }, []);
    
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


						<ActivityList entries={ entries }/>
        </>
    )
}  

export default ActivityLog;
