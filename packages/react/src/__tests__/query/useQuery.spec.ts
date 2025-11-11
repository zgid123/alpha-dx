import { useQuery } from '../../query/useQuery';

interface IUseEnvironmentsParams {
  payload: Record<string, string>;
}

function listEnvironments(_payload: Record<string, string>): Promise<object> {
  return Promise.resolve({});
}

export function useEnvironments({ payload }: IUseEnvironmentsParams) {
  return useQuery(
    listEnvironments,
    ['qk_fetchEnvironments', [payload]],
    {},
    {
      defaultValue: [],
    },
  );
}
