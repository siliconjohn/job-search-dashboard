import { Layout, Button, ConfigProvider, theme } from 'antd';
import ThemeProvider from '../../contexts/theme/ThemeProvider';
import { useTheme } from '../../contexts/theme/useTheme';
import ActivityLog from '../ActivityLog/ActivityLog';
const { Header, Content } = Layout; 

const AppLayout = () => {
    const { themeName, toggleTheme } = useTheme();

    return (
        <ConfigProvider
            theme={{
                algorithm: theme[themeName],
                token: {
                    colorPrimary: '#10b981',
                    colorPrimaryHover: '#34d399',
                    colorPrimaryActive: '#059669',
                    colorSuccess: '#059669',
                    colorInfo: '#0d9488',
                    colorWarning: '#d97706',
                    colorError: '#dc2626',
                    borderRadius: 6,
                },
            }}
        >
            <div className="bg-slate-950 text-slate-100">
                <Layout className="shadow-xl bg-slate-900/60 backdrop-blur">
                    <Header className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-xl md:text-2xl font-semibold text-slate-100">
                                Contact Dashboard
                            </h1>
                        </div>
                        <Button
                            size="small"
                            type="primary"
                            onClick={toggleTheme}
                        >
                            Toggle Theme
                        </Button>
                    </Header>
                    <Content className="px-4 md:px-8 py-6 md:py-8 overflow-y-auto bg-slate-900/40">
                        <ActivityLog />
                    </Content>
                </Layout>
            </div>
        </ConfigProvider>
    );
};

const App: React.FC = () => (
    <ThemeProvider>
        <AppLayout />
    </ThemeProvider>
);

export default App;
