interface IBaseData {
  createdAt: Date;
  updatedAt: Date;
  id: bigint | string;
  [key: string]: unknown;
}

interface ISerializedData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export function serializeData(data: IBaseData): ISerializedData {
  const { id, createdAt, updatedAt, ...rest } = data;

  return {
    ...rest,
    id: id.toString(),
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}
