import { useProjectIdInUrl } from '../displayBoard/util';

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useEpicsQueryKey = () => ['epics', useEpicSearchParams()];
