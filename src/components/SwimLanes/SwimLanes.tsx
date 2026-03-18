import { Card, Tag, Typography } from 'antd';
import { useEntriesStore } from '../../stores/entriesStore';
import { ENTRY_KINDS, getEntryKindColor, type EntryKind } from '../../types/entryTypes';
import { formatDateShort } from '../../utils/dates';

const truncate = (value: string, maxChars: number) => {
    if (value.length <= maxChars) return value;
    return `${value.slice(0, maxChars)}...`;
};

const SwimLanes: React.FC = () => {
    const entries = useEntriesStore((state) => state.entries);

    const getByKindAndDead = (kind: EntryKind, dead: boolean) =>
        entries.filter((e) => e.kind === kind && e.dead === dead);

    return (
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {ENTRY_KINDS.map((kind) => {
                const active = getByKindAndDead(kind, false);
                const archived = getByKindAndDead(kind, true);

                return (
                    <div key={kind} className="min-w-[320px] max-w-[420px] flex-1">
                        <Card
                            className="bg-slate-900/60 border border-slate-800 rounded-xl shadow-sm"
                            title={
                                <span className="flex items-center gap-2">
                                    <Tag color={getEntryKindColor(kind)} variant="solid">
                                        {kind}
                                    </Tag>
                                </span>
                            }
                        >
                            <div className="flex flex-col gap-3">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <Typography.Text className="font-semibold">
                                            Active ({active.length})
                                        </Typography.Text>
                                    </div>

                                    {active.length === 0 ? (
                                        <Typography.Text type="secondary">No active entries</Typography.Text>
                                    ) : (
                                        <div className="flex flex-col gap-2  max-h-[560px] overflow-y-auto pr-1">
                                            {active.map((entry) => {
                                                const url = entry.url?.trim();
                                                const note = entry.note?.trim() ?? '';

                                                return (
                                                    <div
                                                        key={entry.key}
                                                        className="border border-slate-200  rounded-xl bg-slate-100/40 p-3"
                                                    >
                                                        <div className="flex flex-col gap-1">
                                                            <div className="font-semibold">
                                                                {entry.company || '—'}
                                                            </div>
                                                            <div className="text-sm">
                                                                {entry.position || '—'}
                                                            </div>
                                                            <div className="text-sm">
                                                                Contact: {entry.contact || '—'}
                                                            </div>
                                                            <div className="text-xs">
                                                                Created: {formatDateShort.format(new Date(entry.createdAt))}
                                                            </div>
                                                            {url ? (
                                                                <div className="text-xs">
                                                                    <a
                                                                        className="underline"
                                                                        href={url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {truncate(url, 30)}
                                                                    </a>
                                                                </div>
                                                            ) : null}
                                                            {note ? (
                                                                <div className="text-sm">
                                                                    <Typography.Text
                                                                        title={entry.note}
                                                                    >
                                                                        {truncate(note, 90)}
                                                                    </Typography.Text>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <Typography.Text className="font-semibold">
                                            Archived ({archived.length})
                                        </Typography.Text>
                                    </div>

                                    {archived.length === 0 ? (
                                        <Typography.Text type="secondary">No archived entries</Typography.Text>
                                    ) : (
                                        <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1">
                                            {archived.map((entry) => {
                                                const url = entry.url?.trim();
                                                const note = entry.note?.trim() ?? '';

                                                return (
                                                    <div
                                                        key={entry.key}
                                                        className="border border-slate-800 rounded-xl bg-slate-900/30 p-3 opacity-80"
                                                    >
                                                        <div className="flex flex-col gap-1">
                                                            <div className="font-semibold">
                                                                {entry.company || '—'}
                                                            </div>
                                                            <div className="text-sm">
                                                                {entry.position || '—'}
                                                            </div>
                                                            <div className="text-sm">
                                                                Contact: {entry.contact || '—'}
                                                            </div>
                                                            <div className="text-xs">
                                                                Created: {formatDateShort.format(new Date(entry.createdAt))}
                                                            </div>
                                                            {url ? (
                                                                <div className="text-xs">
                                                                    <a
                                                                        className="underline"
                                                                        href={url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {truncate(url, 42)}
                                                                    </a>
                                                                </div>
                                                            ) : null}
                                                            {note ? (
                                                                <div className="text-sm">
                                                                    <Typography.Text title={entry.note}>
                                                                        {truncate(note, 90)}
                                                                    </Typography.Text>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
};

export default SwimLanes;

