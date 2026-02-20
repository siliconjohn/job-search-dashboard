import { useContext } from 'react';
import { Flex, Layout, Button, ConfigProvider, theme } from 'antd';
import { ThemeContext } from '../../contexts/ThemeContext';
import ThemeProvider from '../../contexts/ThemeProvider';
import ActivityLog from '../ActivityLog/ActivityLog';
const { Header, Content } = Layout;
import './App.css';

const AppLayout = () => {
    const { themeName, toggleTheme } = useContext(ThemeContext)!;

    return (
        <ConfigProvider
            theme={{
                algorithm: theme[themeName],
                token: {
                    colorPrimary: '#52c41a',
                    colorSuccess: '#2d6d0d',
                    colorInfo: '#1677ff',
                    colorWarning: '#faad14',
                    colorError: '#ff4d4f',
                    colorPrimaryHover: '#73d13d',
                    colorPrimaryActive: '#389e0d',
                    borderRadius: 6,
                },
            }}
        >
            <Flex gap="middle" wrap>
                <Layout style={{ width: '100vw', height: '100vh' }}>
                    <Header
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            color: '#fff',
                        }}
                    >
                        <h1>Job Search Dashboard</h1>
                        <Button size="small" type="primary" onClick={toggleTheme}>
                            Toggle Theme
                        </Button>
                    </Header>
                    <Content style={{ padding: '24px', overflow: 'scroll' }}>
                        <ActivityLog />
                    </Content>
                </Layout>
            </Flex>
        </ConfigProvider>
    );
};

const App: React.FC = () => (
    <ThemeProvider>
        <AppLayout />
    </ThemeProvider>
);

export default App;