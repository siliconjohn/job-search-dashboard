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
                    // colorPrimary: '#52c41a',
                    // colorSuccess: '#2d6d0d',
                    // colorInfo: '#1677ff',
                    // colorWarning: '#faad14',
                    // colorError: '#ff4d4f',
                    // colorPrimaryHover: '#73d13d',
                    // colorPrimaryActive: '#389e0d',
                    borderRadius: 6,
                },
            }}
        >
            <div className="min-h-screen w-full bg-slate-350 text-slate-900">
                <Layout className="min-h-screen max-w-6xl mx-auto shadow-xl bg-slate-600/60 backdrop-blur">
                    <Header className="flex items-center justify-between px-6 md:px-10 bg-slate-900/80 border-b border-slate-800">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">
                                Tracker
                            </span>
                            <h1 className="text-xl md:text-2xl font-semibold text-slate-100">
                                Job Search Dashboard
                            </h1>
                        </div>
                        <Button
                            size="small"
                            type="primary"
                            onClick={toggleTheme}
                            className="!bg-emerald-500 !border-emerald-400 hover:!bg-emerald-400 hover:!border-emerald-300"
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
