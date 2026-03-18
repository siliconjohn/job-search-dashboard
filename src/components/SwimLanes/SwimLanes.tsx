import { Card, Tag, Typography } from 'antd';
import { useState } from 'react';
import { useEntriesStore } from '../../stores/entriesStore';
import { APPLICATION_STATUS, getApplicationStatusColor, type ApplicationStatus } from '../../types/entryTypes';
import { formatDateShort } from '../../utils/dates';

const truncate = (value: string, maxChars: number) => {
    if (value.length <= maxChars) return value;
    return `${value.slice(0, maxChars)}...`;
};

const SwimLanes: React.FC = () => {
    const entries = useEntriesStore((state) => state.entries);
    const updateStatus = useEntriesStore((state) => state.updateStatus);

    const getByStatusAndDead = (status: ApplicationStatus, dead: boolean) =>
        entries.filter((e) => e.kind === 'Application' && e.status === status && e.dead === dead);

    const [draggingKey, setDraggingKey] = useState<string | null>(null);
    const [dragOverStatus, setDragOverStatus] = useState<ApplicationStatus | null>(null);

    type DragPayload = { key: string };

    const readDragPayload = (e: React.DragEvent) => {
        const raw =
            e.dataTransfer.getData('application/x-job-search-logger') ||
            e.dataTransfer.getData('application/json') ||
            e.dataTransfer.getData('text/plain');

        if (!raw) return null;
        try {
            const parsed: unknown = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object') return null;
            if (!('key' in parsed) || typeof (parsed as DragPayload).key !== 'string') return null;
            return parsed as DragPayload;
        } catch {
            return null;
        }
    };

    return (
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {APPLICATION_STATUS.map((status) => {
                const active = getByStatusAndDead(status, false);
                const archived = getByStatusAndDead(status, true);

                return (
                    <div
                        key={status}
                        className={`min-w-[320px] max-w-[420px] flex-1 ${
                            dragOverStatus === status
                                ? 'ring-2 ring-emerald-200/70 bg-slate-200/25 rounded-xl'
                                : ''
                        }`}
                        onDragOver={(e) => {
                            e.preventDefault(); // allow drop
                            e.dataTransfer.dropEffect = 'move';
                            setDragOverStatus(status);
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            const payload = readDragPayload(e);
                            if (!payload?.key) return;
                            updateStatus(payload.key, status);
                            setDraggingKey(null);
                            setDragOverStatus(null);
                        }}
                    >
                        <Card
                            className="bg-slate-200/60 border border-slate-300 rounded-xl shadow-sm"
                            title={
                                <span className="flex items-center gap-2">
                                    <Tag color={getApplicationStatusColor(status)} variant="solid">
                                        {status}
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
                                        <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1">
                                            {active.map((entry) => {
                                                const url = entry.url?.trim();
                                                const note = entry.note?.trim() ?? '';

                                                const isDraggingThis = draggingKey === entry.key;

                                                return (
                                                    <div
                                                        key={entry.key}
                                                        draggable
                                                        onDragStart={(e) => {
                                                            setDraggingKey(entry.key);
                                                            e.dataTransfer.effectAllowed = 'move';
                                                            e.dataTransfer.setData(
                                                                'application/x-job-search-logger',
                                                                JSON.stringify({ key: entry.key })
                                                            );
                                                        }}
                                                        onDragEnd={() => {
                                                            setDraggingKey(null);
                                                            setDragOverStatus(null);
                                                        }}
                                                        className={`border border-slate-300 rounded-xl bg-slate-200/50 p-3 cursor-grab ${
                                                            isDraggingThis
                                                                ? 'opacity-90 bg-slate-200/70 border-dashed border-emerald-200/70 cursor-grabbing text-sm'
                                                                : ''
                                                        }`}
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

                                                const isDraggingThis = draggingKey === entry.key;

                                                return (
                                                    <div
                                                        key={entry.key}
                                                        draggable
                                                        onDragStart={(e) => {
                                                            setDraggingKey(entry.key);
                                                            e.dataTransfer.effectAllowed = 'move';
                                                            e.dataTransfer.setData(
                                                                'application/x-job-search-logger',
                                                                JSON.stringify({ key: entry.key })
                                                            );
                                                        }}
                                                        onDragEnd={() => {
                                                            setDraggingKey(null);
                                                            setDragOverStatus(null);
                                                        }}
                                                        className={`border border-slate-300 rounded-xl bg-slate-200/35 p-3 opacity-80 cursor-grab ${
                                                            isDraggingThis
                                                                ? 'opacity-90 bg-slate-200/60 border-dashed border-emerald-200/70 cursor-grabbing text-sm'
                                                                : ''
                                                        }`}
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

