export type GuardResult = 'VALID' | 'INVALID';

export const guard = <E>(guardResults: [GuardResult, E][]): E[] => guardResults.flatMap((guardResult) => (guardResult[0] === 'INVALID' ? [guardResult[1]] : []));

export const againstNull = <T>(value: T): GuardResult => ((value === null || value === undefined) ? 'INVALID' : 'VALID');

export const againstNegative = (value: number): GuardResult => ((value < 0) ? 'INVALID' : 'VALID');
