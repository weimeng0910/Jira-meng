import React from 'react';

import { IdSelect } from '@/components/idSelect/id-select';
import { useEpics } from '@/utils/hooks/epic';

export const EpicSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const { data: epics } = useEpics();
    return (
        <IdSelect
            options={epics || []}
            {...props}
        />
    );
};
