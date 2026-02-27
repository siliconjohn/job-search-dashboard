// import { useState, useContext } from 'react';
// import { Card, Input, Tag } from 'antd';
// import { AgGridReact } from 'ag-grid-react';
// import  { type ICellRendererParams,  type ColDef, colorSchemeDarkBlue, themeAlpine } from 'ag-grid-community';
// import { ModuleRegistry } from 'ag-grid-community';
// import { AllCommunityModule , type ValueFormatterParams} from 'ag-grid-community';
// import { useEntriesStore } from '../../stores/entriesStore';
// import { type EntryKind, type Entry, getEntryKindColor } from '../../types/entryTypes';
// import { formatDateShort } from '../../utils/dates'; 
// import { ThemeContext } from '../../contexts/ThemeContext';

// ModuleRegistry.registerModules([AllCommunityModule]); 
// const themeDark = themeAlpine.withPart(colorSchemeDarkBlue);

// const LinkRenderer = (params: ICellRendererParams) => {
//     const value = params.value as string;

//     return (
//         <a
//             style={{
//                 maxWidth: 180,
//                 display: 'inline-block',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 whiteSpace: 'nowrap',
//             }}
//             href={value}
//             target="_blank"
//             rel="noopener noreferrer"
//         >
//             {value}
//         </a>
//     );
// };

// const KindRenderer = (params: ICellRendererParams) => {
//     const value = params.value as EntryKind;
//     return <Tag color={getEntryKindColor(value)}>{value}</Tag>;
// };

// const AGActivityList: React.FC = () => {
//     const entries = useEntriesStore((state) => state.entries);
//     const [searchText, setSearchText] = useState('');
//     const { themeName } = useContext(ThemeContext)!;
//     const gridTheme = themeName === 'darkAlgorithm' ? themeDark : themeAlpine;

//     const  columns: ColDef<Entry>[] = [
//         {
//             field: 'createdAt',
//             headerName: 'Created',
//             filter: true,
//             sortable: true,
//             sort: 'desc' as const,
//             valueFormatter: (params: ValueFormatterParams) =>
//                 params.value ? formatDateShort.format(new Date(params.value)) : '',
//         },
//         {
//             field: 'kind',
//             headerName: 'Kind',
//             filter: true,
//             cellRenderer: KindRenderer,
//         },
//         {
//             field: 'company',
//             headerName: 'Company',
//             filter: true,
//             sortable: true,
//         },
//         {
//             field: 'position',
//             headerName: 'Position',
//             filter: true,
//         },
//         {
//             field: 'url',
//             headerName: 'URL',
//             filter: true,
//             cellRenderer: LinkRenderer,
//         },
//     ];

//     return (
//         <Card title="Log">

//             <Input
//                 placeholder="Search across all columns..."
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 style={{
//                     marginBottom: 16,
//                     maxWidth: 400,
//                 }}
//                 allowClear
//             />

//             <div
//                 className="ag-theme-alpine"
//                 style={{ height: 500, width: '100%' }}
//             >
//                 <AgGridReact
//                     theme={ gridTheme }
//                     rowData={entries}
//                     columnDefs={columns}
//                     defaultColDef={{
//                         flex: 1,
//                         minWidth: 120,
//                         resizable: true,
//                     }}
//                     quickFilterText={searchText}
//                 />
//             </div>
//         </Card>
//     );
// };

// export default AGActivityList;